import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "@/styles/theme.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#181846",
};

export const metadata: Metadata = {
  title: "devōt - Tracking tool",
  description: "Work hours tracking tool",
  icons: {
    apple: {
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    icon: [
      {
        sizes: "16x16",
        type: "image/png",
        url: "/favicon-16x16.png",
      },
      {
        sizes: "32x32",
        type: "image/png",
        url: "/favicon-32x32.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
