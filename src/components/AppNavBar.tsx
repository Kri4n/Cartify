"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useUserContext } from "../context/UserContext";

import { useContext, useEffect, useState } from "react";

// Import icons
import {
  FaHome,
  FaShopify,
  FaInfoCircle,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaCheck,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

function NavScrollExample() {
  const { user } = useUserContext();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent mismatch: render nothing until client hydrates
    return null;
  }

  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand as={Link} href="/">
          <h3 className="ps-3">Cartify</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto ms-auto my-2 my-lg-0" navbarScroll>
            {user.id ? (
              user.isAdmin ? (
                <>
                  <Nav.Link
                    className="fw-bold d-flex align-items-center"
                    as={Link}
                    href="/products"
                  >
                    <MdDashboard className="me-2" /> DASHBOARD
                  </Nav.Link>
                  <Nav.Link
                    className="fw-bold d-flex align-items-center"
                    as={Link}
                    href="/logout"
                  >
                    <FaSignOutAlt className="me-2" /> LOGOUT
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className="fw-bold d-flex align-items-center"
                    as={Link}
                    href="/"
                  >
                    <FaHome className="me-2" /> HOME
                  </Nav.Link>
                  <Nav.Link
                    className="fw-bold d-flex align-items-center"
                    as={Link}
                    href="/products"
                  >
                    <FaShopify className="me-2" /> PRODUCTS
                  </Nav.Link>
                  <Nav.Link
                    className="fw-bold d-flex align-items-center"
                    as={Link}
                    href="/about"
                  >
                    <FaInfoCircle className="me-2" /> ABOUT
                  </Nav.Link>
                  <NavDropdown
                    className="fw-bold d-flex align-items-center"
                    title="PROFILE"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item
                      as={Link}
                      href="cart"
                      className="d-flex align-items-center"
                    >
                      <FaShoppingCart className="me-2" /> Cart
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/orders"
                      className="d-flex align-items-center"
                    >
                      <FaCheck className="me-2" /> Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      href="/profile"
                      className="d-flex align-items-center"
                    >
                      <FaUser className="me-2" /> My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href="/logout"
                      className="d-flex align-items-center"
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )
            ) : (
              <>
                <Nav.Link
                  className="fw-bold d-flex align-items-center"
                  as={Link}
                  href="/"
                >
                  <FaHome className="me-2" /> HOME
                </Nav.Link>
                <Nav.Link
                  className="fw-bold d-flex align-items-center"
                  as={Link}
                  href="/products"
                >
                  <FaShopify className="me-2" /> PRODUCTS
                </Nav.Link>
                <Nav.Link
                  className="fw-bold d-flex align-items-center"
                  as={Link}
                  href="/about"
                >
                  <FaInfoCircle className="me-2" /> ABOUT
                </Nav.Link>
                <Nav.Link
                  className="fw-bold d-flex align-items-center"
                  as={Link}
                  href="/login"
                >
                  <FaSignInAlt className="me-2" /> LOGIN
                </Nav.Link>
                <Nav.Link
                  className="fw-bold d-flex align-items-center"
                  as={Link}
                  href="/register"
                >
                  <FaSignInAlt className="me-2" /> REGISTER
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
