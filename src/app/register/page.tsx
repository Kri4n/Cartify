"use client";

import { useState, useEffect, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { Notyf } from "notyf";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useUserDetails } from "@/hooks/useUserDetails";
import axios from "axios";

export default function Register() {
  const notyf = new Notyf();
  const router = useRouter();

  const { user, loading, error } = useUserDetails();

  // State hooks to store the values of the input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to determine whether the submit button is enabled or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
        {
          firstName,
          lastName,
          email,
          mobileNo,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      console.log(data);

      if (data.message === "User registered successfully") {
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobileNo("");
        setPassword("");
        setConfirmPassword("");

        notyf.success("Registration successful");
        router.push("/login");
      } else {
        notyf.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      notyf.error("Something went wrong");
    }
  }

  return (
    <Form onSubmit={(e) => registerUser(e)} className="container my-5">
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm p-4 w-50">
          <h1 className="text-center mb-4">Register</h1>

          <Form.Group className="mb-3">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile No:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter 11 Digit No."
              required
              value={mobileNo}
              onChange={(e) => {
                setMobileNo(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>

          {isActive ? (
            <Button className="w-100" variant="dark" type="submit">
              Submit
            </Button>
          ) : (
            <Button
              className="w-100"
              variant="outline-dark"
              type="submit"
              disabled
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
