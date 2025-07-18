import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import { TransactionProvider } from '@/context/TransactionContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance Visualizer",
  description: "Personal Finance Visualizer - Track and visualize your expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TransactionProvider>
          {children}
        </TransactionProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
