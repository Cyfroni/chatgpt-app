import { auth, signIn, signOut } from "@/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import Link from "next/link";
import UserButton from "./components/UserButton";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chat GPT App | Nextjs",
  description: "Chat GPT App developed in Nextjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
        >
          <header className="text-white font-bold bg-green-900 text-2xl p-2 mb-3 rounded-b-lg shadow-gray-700 shadow-lg flex">
            <div className="flex flex-grow">
              <Link href="/">GPT Chat</Link>
              <Link href="/about" className="ml-5 font-light">
                About
              </Link>
            </div>
            <div>
              <UserButton
                signInAction={async () => {
                  "use server";
                  await signIn();
                }}
                signOutAction={async () => {
                  "use server";
                  await signOut();
                }}
              />
            </div>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
