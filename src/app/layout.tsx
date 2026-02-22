import type { Metadata } from "next";
import "../styles/global.scss";
import Head from "next/head";

export const metadata: Metadata = {
  title: "ORB School",
  description: "Created by ORB Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=JetBrains+Mono:ital,wght@0,500;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
