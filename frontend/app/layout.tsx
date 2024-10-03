import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { ThemeProvider } from './components/MaterialUIWrapper';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import Head from 'next/head';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RoomCare.Pro',
  description: "L'assitant connecté pour votre hôtel"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <Head>
        <script src="https://kit.fontawesome.com/061f1c17d4.js" crossOrigin="anonymous" async></script>
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
