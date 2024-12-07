import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "مدیک پلاس",
  description: "سیستم مدیریت و نوبت دهی بیمارستان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning className="scrollbar-thin scrollbar-track-dark-400 scrollbar-thumb-dark-500">
      <body className={cn("min-h-screen bg-dark-300 font-Dana antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
