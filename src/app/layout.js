"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/providers/UserContext";
import { AlertDialogProvider } from "@/components/shared/alert";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { Toaster } from "@/components/shared/toaster";

import "./globals.css";
import AuthGuard from "@/app/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlertDialogProvider>
            <UserProvider>
              <TanstackProvider>
                <SidebarProvider className="flex flex-col h-full">
                  <AuthGuard>{children}</AuthGuard>
                </SidebarProvider>
              </TanstackProvider>
            </UserProvider>
            <Toaster />
          </AlertDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
