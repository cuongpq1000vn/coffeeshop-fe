"use client";
import NavBar from "@/components/organisms/navbar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow mt-36">{children}</div>
    </div>
  );
}
