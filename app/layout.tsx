import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Andasy Docs",
  metadataBase: new URL("https://docs.andasy.io/"),
  description:
    "With Andasy, developers can effortlessly drop their code onto the platform and let the magic happen. Andasy handles the building, publishing, and deploying, bringing your application live for the world to see!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sansFont.variable} ${monoFont.variable} font-regular antialiased tracking-wide`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
