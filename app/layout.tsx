import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business Analyst AI Studio",
  description: "AI-generated requirements documentation for business analysts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased" suppressHydrationWarning>
        <body className="min-h-full bg-background" suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  );
}
