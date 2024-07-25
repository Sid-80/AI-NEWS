import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers/ThemeProvider";
import ReduxProvider from "@/components/Providers/ReduxProvider";
import QueryProvider from "@/components/Providers/TanstackProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-secondary overflow-x-hidden`}>
        <Providers>
          <ReduxProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
