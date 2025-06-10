"use client"; // Necesitamos convertir esto en un Client Component
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/providers/UserContext";
import "./globals.css";
import AuthGuard from "@/app/AuthGuard"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Asegúrate de que la ruta sea correcta
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <SidebarProvider className="flex flex-col h-full">
              <AuthGuard>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </AuthGuard>
            </SidebarProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
