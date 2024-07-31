"use client";
import { TokenDTO } from "@/types/dtos/auth/Token";
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  sessionToken: {
    storeId: "",
    account: "",
    token: "",
    expiresAt: new Date(),
    userType: {
      type: "",
    },
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
    userType: {
      type: "",
    },
  },
}: {
  children: React.ReactNode;
  initialSessionToken?: TokenDTO;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
