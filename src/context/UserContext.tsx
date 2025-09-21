"use client";

import React from "react";

export type User = {
  id: string | null;
  isAdmin: boolean | null;
};

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  unsetUser: () => void;
};

// default empty context
const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = UserContext.Provider;

export default UserContext;
