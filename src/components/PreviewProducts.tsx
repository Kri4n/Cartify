"use client";

import { Card, Badge, Button } from "react-bootstrap";
import Link from "next/link";

export default function PreviewProducts(props: { data: any }) {
  const { data } = props;
  const { _id, name, price } = data;

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Card className="overflow-hidden" style={{ maxWidth: "20rem" }}>
      {/* Image on top */}
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
        style={{ height: "160px", objectFit: "cover" }}
      />

      {/* Body below the image */}
      <Card.Body>
        <Card.Title>{truncateText(name, 30)}</Card.Title>
        <Badge bg="secondary" className="mb-2">
          PHP {price}
        </Badge>
      </Card.Body>

      {/* Footer below body */}
      <Card.Footer className="bg-transparent border-0">
        <Button
          href={`/products/${_id}`}
          className="text-decoration-none text-white"
          variant="dark"
        >
          More Details
        </Button>
      </Card.Footer>
    </Card>
  );
}
