import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import { PrimeReactProvider } from "primereact/api";

import "@/styles/globals.css";
import "@/styles/theme.css";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devōt - Tracking tool",
  description: "Work hours tracking tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <PrimeReactProvider>
          <Header />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
