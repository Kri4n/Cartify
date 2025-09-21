import { useState } from "react";
import { Button } from "react-bootstrap";
import { Notyf } from "notyf";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
};

type ActivateProductProps = {
  product: Product;
  isActive: boolean;
  fetchData: () => void;
};

export default function ActivateProduct({
  product,
  isActive,
  fetchData,
}: ActivateProductProps) {
  const [productId] = useState(product._id);

  const notyf = new Notyf();

  const activateProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/activate`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        await response.json();
        fetchData();
      } else {
        await response.json();
        notyf.error("Error activating the product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const disableProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/archive`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        await response.json();
        fetchData();
      } else {
        await response.json();
        notyf.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {isActive ? (
        <Button
          className="my-2"
          variant="danger"
          size="sm"
          onClick={() => disableProduct()}
        >
          Disable
        </Button>
      ) : (
        <Button
          className="my-2"
          variant="success"
          size="sm"
          onClick={() => activateProduct()}
        >
          Activate
        </Button>
      )}
    </>
  );
}
