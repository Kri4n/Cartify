"use client";

import { useState, useEffect, useContext } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Notyf } from "notyf";
import { useUserDetails } from "@/hooks/useUserDetails";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const notyf = new Notyf();
  const emptyCart = "https://cdn-icons-png.flaticon.com/512/11329/11329060.png";
  const { user, loading, error } = useUserDetails();
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  function fetchCartItems() {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const updatedItems = data[0].cartItems as CartItem[];
          setTotalPrice(data[0].totalPrice);

          // Fetch product details for each item in the cart
          const updatedCartItemsPromises = updatedItems.map((item) =>
            fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${item.productId}`
            )
              .then((res) => res.json())
              .then((productData) => ({
                ...item,
                productName: productData.name,
                price: productData.price, // Add price for each product
              }))
          );

          Promise.all(updatedCartItemsPromises)
            .then((updatedItemsWithNames) =>
              setCartItems(updatedItemsWithNames)
            )
            .catch(() => notyf.error("Failed to fetch product details."));
        }
      })
      .catch(() => notyf.error("Failed to fetch cart items."));
  }

  function updateQuantity(productId: string, newQuantity: number) {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.productId === productId && item.price !== undefined) {
          return {
            ...item,
            quantity: newQuantity,
            subtotal: item.price * newQuantity, // update subtotal locally
          };
        }
        return item;
      })
    );

    // Recalculate total price locally
    setTotalPrice((prevTotal) =>
      cartItems.reduce((acc, item) => {
        if (item.productId === productId && item.price !== undefined) {
          return acc + item.price * newQuantity;
        }
        return acc + (item.subtotal ?? 0);
      }, 0)
    );

    // Persist to backend
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/update-cart-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity: newQuantity,
        subtotal:
          cartItems.find((i) => i.productId === productId)?.price! *
          newQuantity,
      }),
    }).catch(() => {
      notyf.error("Failed to update quantity.");
    });
  }

  function removeFromCart(productId: string) {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/${productId}/remove-from-cart`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        notyf.success("Item removed from cart");
        fetchCartItems();
      })
      .catch((error) => {
        notyf.error("Failed to remove item.");
      });
  }

  function clearCart() {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/clear-cart`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        notyf.error("Failed to clear cart.");
      });
  }

  function checkout() {
    if (!user) {
      notyf.error("User not logged in.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.id,
        cartItems,
        totalPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Ordered Successfully") {
          notyf.success("Order placed successfully!");
          clearCart(); // Clear the cart after a successful order
          router.push("/orders");
        } else {
          notyf.error(data.error || "Failed to place order.");
        }
      })
      .catch(() => notyf.error("Failed to checkout."));
  }

  return (
    <div className="my-5">
      <h2 className="text-center mb-4 fw-bold">My Cart</h2>

      {cartItems.length === 0 ? (
        <Alert variant="warning" className="text-center mt-5 p-5">
          <h3>Your cart is empty.</h3>
          <Link className="btn btn-dark my-2" href="/products">
            Go to Products
          </Link>
          <div className="d-flex justify-content-center align-items-center">
            <img className="img-fluid empty-cart" src={emptyCart} />
          </div>
        </Alert>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item
              key={item.productId}
              className="d-flex justify-content-between"
            >
              <div>
                <div className="lead fw-bold">{item.productName}</div>
                <div className="lead">Price: ₱{item.price}</div>{" "}
                {/* Show price per product */}
                <div className="lead">
                  Quantity: {item.quantity}
                  <ButtonGroup aria-label="modifyQuantity" className="ps-5">
                    <Button
                      variant="outline-dark"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Button
                      variant="outline-dark"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="lead">Subtotal: ₱{item.subtotal}</div>
              </div>
              <div className="my-auto">
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {cartItems.length > 0 && (
        <>
          <Button variant="danger" className="mt-3" onClick={() => clearCart()}>
            Clear Cart
          </Button>
          <div className="d-flex justify-content-between mt-4">
            <h4>Total Price: ₱{totalPrice}</h4>
            <Button variant="dark" onClick={checkout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
