import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exam Boss",
  description: "AI + gamification exam prep MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
