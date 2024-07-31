import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "@/context/AppProvider";
import { cookies } from "next/headers";
import "./globals.css";
import { TokenDTO } from "@/types/dtos/auth/Token";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies()
  const sessionToken = cookiesStore.get('sessionToken');
  return (
    <html lang="en">
      <body>
        <AppProvider initialSessionToken={JSON.parse(sessionToken?.value!) as TokenDTO}>
          {children} <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
