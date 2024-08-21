import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../app/components/Header"
import Footer from "./components/Footer";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';



config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoomCare.Pro",
  description: "L'assitant 2.0 pour votre hôtel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="fr">
      <script src="https://kit.fontawesome.com/061f1c17d4.js" crossOrigin="anonymous" async></script>
      <body className={inter.className}> 
        <Header />
          {children}
          <Footer />
      </body>
    </html>
  
  );
}
