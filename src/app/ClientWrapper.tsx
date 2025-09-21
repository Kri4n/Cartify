"use client";

import { useState, useEffect } from "react";
import { UserProvider, User } from "@/context/UserContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({ id: null, isAdmin: null });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/details`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User details:", data);
        if (data) {
          setUser({ id: data._id, isAdmin: data.isAdmin });
        } else {
          setUser({ id: null, isAdmin: null });
        }
      });
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>{children}</UserProvider>
  );
}
