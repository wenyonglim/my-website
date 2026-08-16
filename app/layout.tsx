import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cheng Lim — Notes & CV",
  description: "Writing, ideas and work by Cheng Lim.",
  metadataBase: new URL("https://cheng-lim-notes.peng-cheng.chatgpt.site"),
  openGraph: {
    title: "Cheng Lim — Notes & CV",
    description: "Writing, ideas and work by Cheng Lim.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheng Lim — Notes & CV",
    description: "Writing, ideas and work by Cheng Lim.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
