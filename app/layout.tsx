import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mainog = "https://procise.zerops.xyz/og.jpg"

export const metadata: Metadata = {
  title: "Procise",
  description: "Summarize Hacker News Comments",
  openGraph: {
    images: [mainog],
  },
  twitter: {
    card: "summary_large_image",
    title: "Procise",
    description: "Summarize Hacker News Comments",
    images: [mainog],
    creator: "@ronitraj_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
