import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Workbench } from 'next/font/google';

export const metadata: Metadata = {
  title: "CV 2025",
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
    <html suppressHydrationWarning>
      <body className={workbench.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
