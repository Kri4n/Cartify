"use client";

import AdminView from "@/components/AdminView";
import UserView from "@/components/UserView";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Products() {
  const { user, loading, error } = useUserDetails();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchData = () => {
    setLoadingProducts(true);

    let fetchUrl =
      user?.isAdmin === true
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
      .finally(() => setLoadingProducts(false));
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

  return user?.isAdmin === true ? (
    <AdminView productsData={products} fetchData={fetchData} />
  ) : (
    <UserView productsData={products} />
  );
}
