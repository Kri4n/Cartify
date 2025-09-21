// context/UserContext.tsx
"use client";
import React, { useContext } from "react";

export type User = {
  id: string | null;
  isAdmin: boolean | null;
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  unsetUser: () => void;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = UserContext.Provider;

// Custom hook that ensures context is not undefined
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
