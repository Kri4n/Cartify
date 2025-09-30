"use client";

import { useState, useEffect, useContext, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setToken } from "@/redux/authSlice";
import axios from "axios";
import { Notyf } from "notyf";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();
  const [notyf, setNotyf] = useState<any>(null);

  useEffect(() => {
    const { Notyf } = require("notyf");
    setNotyf(new Notyf());
  }, []);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = res.data;

    if (res.status === 200) {
      dispatch(setToken(data.access));
      router.push("/products");
    } else {
      notyf.error("User Not Found. Try Again");
    }
  }

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <div className="border rounded p-3 shadow mt-5 mb-5 d-flex justify-content-center">
      <div className="w-50 my-3">
        <Form onSubmit={(e) => handleLogin(e)}>
          <h2 className="p-5 text-center">Login</h2>
          <div className="d-flex flex-column p-3">
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center mb-5">
            {isActive ? (
              <Button
                className="w-50 mt-5"
                variant="dark"
                type="submit"
                id="loginBtn"
              >
                Login
              </Button>
            ) : (
              <Button
                className="w-50 mt-5"
                variant="outline"
                type="submit"
                id="loginBtn"
                disabled
              >
                Login
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
