import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Workbench } from 'next/font/google';

export const metadata: Metadata = {
  title: "Portfolio 2025",
  description: "Portfolio",
};

const workbench = Workbench({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workbench.className}>
        {children}
      </body>
    </html>
  );
}
