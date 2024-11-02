import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const noto = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and morty app",
  description: "Test rick and morty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={noto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn></SignedIn>
            {children}
   
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
