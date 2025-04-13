import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";  
import './globals.css'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ERP System",
  description: "Sistema de gestión empresarial",
};

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
          <SidebarProvider className="flex flex-col h-full">
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}