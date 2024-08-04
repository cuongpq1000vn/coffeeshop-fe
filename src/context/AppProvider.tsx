"use client";
import { TokenDTO } from "@/types/dtos/auth/Token";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext({
  sessionToken: {
    storeId: "",
    account: "",
    token: "",
    expiresAt: new Date(),
    userType: "",
  },
  setSessionToken: (sessionToken: TokenDTO) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error context");
  }
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = {
    storeId: "",
    account: "",
    token: "",
    expiresAt: new Date(),
    userType: "",
  },
}: Readonly<{
  children: React.ReactNode;
  initialSessionToken?: TokenDTO;
}>) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const obj = useMemo(() => ({ sessionToken, setSessionToken }), [sessionToken]);
  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>;
}
