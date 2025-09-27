import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Notyf } from "notyf";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

type EditProductProps = {
  product: Product;
  fetchData: () => void;
  buttonText?: string;
};

export default function EditProduct({
  product,
  fetchData,
  buttonText,
}: EditProductProps) {
  const notyf = new Notyf();

  const [productId, setProductId] = useState(product._id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [showEdit, setShowEdit] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  const editProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    productId: any
  ) => {
    e.preventDefault();

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/update`,
      {
        name: name,
        description: description,
        price: price,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    if (data.success === true) {
      notyf.success("Successfully Updated");
      closeEdit();
      fetchData();
    } else {
      notyf.error("Something went wrong");
      closeEdit();
      fetchData();
    }
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit()}>
        {buttonText || "Update"}
      </Button>

      {/*Edit Modal*/}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
