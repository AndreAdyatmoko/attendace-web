import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <Toaster/>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
