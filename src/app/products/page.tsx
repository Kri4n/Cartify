"use client";

import AdminView from "@/components/AdminView";
import UserView from "@/components/UserView";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";

export default function Products() {
  const { user } = useUserContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    let fetchUrl =
      user.isAdmin === true
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/active`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading products...</span>
        </Spinner>
      </div>
    );
  }

  return user.isAdmin === true ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} />
  );
}
