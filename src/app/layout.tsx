import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "American Faith Academy - Where Minds Soar and Faith Takes Flight",
  description: "Uniting Classic Wisdom, Modern Technology, and an Enduring Community for Lasting Impact. Classical Christian education with adaptive technology.",
  keywords: "classical education, Christian school, online learning, faith-based education, homeschool, ESA funding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-sans antialiased">
        <ClientBody>
          <Navigation />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
