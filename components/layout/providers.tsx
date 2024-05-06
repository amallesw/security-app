"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const dummySession = { expires: "2099-01-01T00:00:00Z" };

export default function Providers({
  // session,
  children,
}: {
  // session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={dummySession}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
