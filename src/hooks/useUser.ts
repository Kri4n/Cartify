"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, unsetUser } from "@/redux/features/userSlice";
import { AppDispatch } from "@/lib/store";

export function useUser() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(unsetUser());
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/details`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw API data:", data);

        // ✅ correct path: `data.user`
        const user = data.user;

        if (user && user._id) {
          dispatch(
            setUser({
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              mobileNo: user.mobileNo,
              isAdmin: user.isAdmin,
            })
          );
        } else {
          dispatch(unsetUser());
        }
      })
      .catch(() => {
        dispatch(unsetUser());
      });
  }, [dispatch]);
}
