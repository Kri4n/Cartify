"use client";

import { useState, useEffect, useContext, FormEvent, JSX } from "react";
import { Button, ButtonGroup, Table, Modal, Form } from "react-bootstrap";
import EditProduct from "./EditProduct";
import ActivateProduct from "./ActivateProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUserDetails } from "@/hooks/useUserDetails";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
};

type AdminViewProps = {
  productsData: Product[];
  fetchData: () => void;
};

export default function AdminView({ productsData, fetchData }: AdminViewProps) {
  const { user, loading, error } = useUserDetails();

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [notyf, setNotyf] = useState<any>(null);

  const [products, setProducts] = useState<JSX.Element[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const { Notyf } = require("notyf");
    setNotyf(new Notyf());
  }, []);

  // Generate rows for products table
  useEffect(() => {
    const productsArr = productsData.map((product) => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td className="text-center">
          <EditProduct
            product={product}
            fetchData={fetchData}
            buttonText="Update"
          />
          <ActivateProduct
            product={product}
            isActive={product.isActive}
            fetchData={fetchData}
          />
        </td>
      </tr>
    ));

    setProducts(productsArr);
  }, [productsData]);

  // Modal controls
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  // Add New Course
  async function createProduct(e: FormEvent<HTMLFormElement>) {
    //prevent submit event's default behavior
    e.preventDefault();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
      {
        name: name,
        description: description,
        price: price,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status == 200 || 201) {
      const data = res.data;

      if (data) {
        setName("");
        setDescription("");
        setPrice("");

        notyf.success("Product Added");

        handleCloseCreateModal();

        fetchData();
      } else {
        notyf.error("Error: Something Went Wrong.");
      }
    }
  }

  if (!user?.isAdmin) {
    router.push("/"); // redirect to homepage
    return null; // prevent rendering anything else
  }

  return user?.isAdmin === true ? (
    <>
      <h2 className="text-center pt-4">Admin Dashboard</h2>

      <div className="d-flex justify-content-center mb-3">
        <ButtonGroup>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Add New Product
          </Button>
          <Link href="/all-orders">
            <Button variant="success">Show All Orders</Button>
          </Link>
          <Link href="/user-management">
            {" "}
            <Button variant="warning">User Management</Button>{" "}
          </Link>
          {/* Link to manage users */}
        </ButtonGroup>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead className="bg-dark text-white">
          <tr className="text-center">
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for adding new product */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createProduct(e)}>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              />
            </Form.Group>

            <Form.Group controlId="productDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                required
              />
            </Form.Group>

            <Form.Group controlId="productPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  ) : null;
}
