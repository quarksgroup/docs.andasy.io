import { page_routes } from '@/lib/routes-config';
import fs from 'fs';
import type { MetadataRoute } from 'next';
import path from 'path';

function getFileLastModified(href: string): string | undefined {
    const docsDirectory = path.join(process.cwd(), 'contents', 'docs');
    let relativePath = href;

    if (relativePath.startsWith('/')) {
        relativePath = relativePath.substring(1);
    }

    const possibleExtensions = ['.mdx'];

    for (const ext of possibleExtensions) {
        const filePath = path.join(docsDirectory, relativePath, `index${ext}`);
        try {
            const stats = fs.statSync(filePath);
            return stats.mtime.toISOString();
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'ENOENT') {
                continue;
            }
            if (error instanceof Error) {
                console.warn(`Error reading file stats for ${filePath}:`, error.message);
            } else {
                console.warn(`An unknown error occurred for ${filePath}:`, error);
            }
        }
    }

    console.warn(`Could not find index MDX file for href: ${href}. Using current date.`);
    return undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://docs.andasy.io';

    const docEntries: MetadataRoute.Sitemap = page_routes.map((page) => {
        const lastModified = getFileLastModified(page.href) || new Date().toISOString();
        const url = `${baseUrl}${page.href}`;

        return {
            url,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        };
    });

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];

    return [...staticPages, ...docEntries];
}