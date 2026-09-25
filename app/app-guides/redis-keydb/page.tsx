import DocsPage, { generateMetadata as docsMetadata } from "@/app/docs/[[...slug]]/page";

const guideProps = () => ({
  params: Promise.resolve({ slug: ["app-guides", "redis-keydb"] }),
});

export default function RedisKeyDBPage() {
  return DocsPage(guideProps());
}

export async function generateMetadata() {
  return {
    ...(await docsMetadata(guideProps())),
    alternates: { canonical: "/app-guides/redis-keydb" },
  };
}
