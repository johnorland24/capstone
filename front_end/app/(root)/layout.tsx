import React from "react";  
import type { Metadata } from "next";  
import { Inter } from "next/font/google";  
import { ClerkProvider } from "@clerk/nextjs";  
import { dark } from "@clerk/themes";  
import Head from "next/head"; // Import Head from next/head  

import "../globals.css";  
import LeftSidebar from "@/components/shared/LeftSidebar";  
import Bottombar from "@/components/shared/Bottombar";  
import RightSidebar from "@/components/shared/RightSidebar";  
import Topbar from "@/components/shared/Topbar";  

const inter = Inter({ subsets: ["latin"] });  

export const metadata: Metadata = {  
  title: "Lermn",  
  description: "A Next.js 13 Meta Lermn application",  
};  

export default function RootLayout({  
  children,  
}: {  
  children: React.ReactNode;  
}) {  
  return (  
    <ClerkProvider  
      appearance={{  
        baseTheme: dark,  
      }}  
    >  
      <html lang='en'>  
        <Head>  
          <link rel="icon" href="/favicon.ico" />  
          {/* You can also add other metadata like viewport, theme-color, etc. here */}  
        </Head>  
        <body className={inter.className}>  
          <Topbar />  

          <main className='flex flex-row'>  
            <LeftSidebar />  
            <section className='main-container'>  
              <div className='w-full max-w-4xl'>{children}</div>  
            </section>  
            {/* @ts-ignore */}  
            <RightSidebar />  
          </main>  

          <Bottombar />  
        </body>  
      </html>  
    </ClerkProvider>  
  );  
}