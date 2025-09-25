"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { useUserDetails } from "@/hooks/useUserDetails";

// ---- Types ----
interface ProductOrdered {
  productId: string;
  quantity: number;
  subtotal: number;
  name?: string; // filled after fetching product details
}

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  productsOrdered: ProductOrdered[];
}

interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

// ---- Component ----
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading2, setLoading] = useState<boolean>(true);
  const [error2, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { user, loading, error } = useUserDetails();

  // Function to fetch product details by productId
  const fetchProductDetails = async (
    productId: string
  ): Promise<ProductDetails | null> => {
    try {
      const response = await axios.get<ProductDetails>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`
      );
      return response.data; // axios already parses JSON
    } catch (err) {
      console.error("Error fetching product details:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          // For each order, fetch product details for each productId
          const ordersWithProducts: Order[] = await Promise.all(
            data.map(async (order: Order) => {
              const productsWithNames: ProductOrdered[] = await Promise.all(
                order.productsOrdered.map(async (product: ProductOrdered) => {
                  const productDetails = await fetchProductDetails(
                    product.productId
                  );
                  return {
                    ...product,
                    name: productDetails
                      ? productDetails.name
                      : "Product not found",
                  };
                })
              );

              return {
                ...order,
                productsOrdered: productsWithNames,
              };
            })
          );

          setOrders(ordersWithProducts);
        }
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle showing and hiding the modal
  const handleShowModal = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Render the component based on loading state or errors
  if (loading) {
    return <div className="text-center h1">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center my-5">Orders History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col key={order._id} md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order #{order._id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Status: {order.status}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Total Price:</strong> ₱{order.totalPrice.toFixed(2)}
                  </Card.Text>
                  <Button variant="dark" onClick={() => handleShowModal(order)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal to show order details */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-center p-3">
              Status: {selectedOrder.status} | Total Price: ₱
              {selectedOrder.totalPrice.toFixed(2)}
            </h5>
            <ListGroup>
              {selectedOrder.productsOrdered.map((product, index) => (
                <ListGroup.Item key={index}>
                  <strong>Product Name:</strong> {product.name} <br />
                  <strong>Product ID:</strong> {product.productId} <br />
                  <strong>Quantity:</strong> {product.quantity} <br />
                  <strong>Subtotal:</strong> ₱{product.subtotal.toFixed(2)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Orders;
function setError(error: any) {
  throw new Error("Function not implemented.");
}
