"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import UserContext, { useUserContext } from "../../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    unsetUser();
    setUser({
      id: null,
      isAdmin: null,
    });

    // redirect after logout
    router.push("/login");
  }, [router, setUser, unsetUser]);

  return null; // no UI needed, just redirects
}
