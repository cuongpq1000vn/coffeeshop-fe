import { DashBoard, NavBar } from "@/components/organisms";
import { CssBaseline } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ của Productic, được tạo bởi Được dev",
};

export default function Home() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className="flex-grow mt-36">
        <DashBoard />
      </div>
    </>
  );
}
