"use client";
import { useState, useEffect, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { Notyf } from "notyf";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/hooks/useUserDetails";
import axios from "axios";

export default function Profile() {
  const { user, loading, error } = useUserDetails();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [notyf, setNotyf] = useState<Notyf | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    setNotyf(new Notyf());
  }, []);

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-password`,
        { newPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200) {
        notyf?.success("Password changed successfully");
        setPassword("");
        setConfirmPassword("");
        setShow(false);
      } else {
        const errorData = await response.data;
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Container className="mt-5 mb-5 pb-5 p-5 bg-dark text-white rounded-top">
      <h3 className="">Profile</h3>
      <hr />
      <Button variant="light outline-dark" onClick={handleShow}>
        Change Password
      </Button>
      <h1 className="my-3">{`${user?.firstName} ${user?.lastName}`}</h1>
      <h5 className="my-2">Contact Details</h5>
      <h5 className="lead">{user?.email}</h5>
      <h5 className="lead">{user?.mobileNo}</h5>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMessage("");
                }}
                required
              />
              {message && (
                <div className="alert alert-danger text-danger mt-2">
                  {message}
                </div>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
