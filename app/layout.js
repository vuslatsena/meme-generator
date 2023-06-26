"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { MemeProvider } from "./context/memeContext";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <MemeProvider>
          <body className={inter.className}>{children}</body>
        </MemeProvider>
      </QueryClientProvider>
    </html>
  );
}
