import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";


export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Simple Dashboard with Next.js and Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="dark">
        <Navbar/>
        <main className="p-4">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
