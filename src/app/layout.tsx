"use client"; // Marca este archivo como un componente del lado del cliente
import React from 'react';
import Image from 'next/image';
import styles from './layout.module.css';
import NavBar from '@/components/NavBar/NavBar';
import { usePathname } from 'next/navigation';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import Modal from '@/components/Modal/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isMovieDetail = pathname.startsWith('/movies/');

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMt23cez/3paNdF+Xo9pEVUJmJ6RFp2jqkIYoDo"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
        />
      </head>
      <body>
        <GlobalProvider>
          <NavBar />
          {!isMovieDetail &&
            <div className={styles.headerImage}>
              <Image
                src="/assets/mainBanner.svg"
                alt="Header Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          }

          <main className={styles.main}>{children}</main>
          <Modal />
        </GlobalProvider>
      </body>
    </html>
  );
}
