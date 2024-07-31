"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "@/components/organisms/navbar/navbar";
import theme from "@/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow mt-52">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
