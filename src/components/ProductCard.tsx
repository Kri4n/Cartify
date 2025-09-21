import PropTypes from "prop-types";

import { Card, Image, Text } from "@chakra-ui/react";

import { Button } from "react-bootstrap";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  productProp: Product;
}

export default function ProductCard({ productProp }: ProductCardProps) {
  const { _id, name, description, price } = productProp;

  return (
    <Card.Root className=" p-3" maxW="sm" overflow="hidden">
      <Link
        className="text-decoration-none text-white"
        href={`/products/${_id}`}
      >
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
        />
        <Card.Body gap="1">
          <Card.Title>{name}</Card.Title>
          <Card.Description>{description}</Card.Description>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
            ₱ {price}
          </Text>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
