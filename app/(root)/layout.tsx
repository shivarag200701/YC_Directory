import React from "react";
import Navbar from "../../components/Navbar";
import GlobalLoading from "../../components/GlobalLoading";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <GlobalLoading />
      <Navbar />
      {children}
    </main>
  );
}
