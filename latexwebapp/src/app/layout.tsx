import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import "./assets/globals.css";
import { Providers } from "./providers";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "PaperLeaf",
  description: "", /*TODO: Update later */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className}`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
