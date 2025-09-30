import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

  const [notyf, setNotyf] = useState<any>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const { Notyf } = require("notyf");
    setNotyf(new Notyf());
  }, []);

  const activateProduct = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/activate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || 201) {
        fetchData();
      } else {
        notyf.error("Error activating the product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const disableProduct = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/archive`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || 201) {
        fetchData();
      } else {
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
