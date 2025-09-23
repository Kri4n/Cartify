import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
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
    <Card
      className="shadow-sm m-1"
      style={{ maxWidth: "14rem", fontSize: "0.9rem" }}
    >
      <Link
        className="text-decoration-none text-dark"
        href={`/products/${_id}`}
      >
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
          alt={name}
          style={{ height: "120px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <div>
            <Card.Title
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Card.Title>
            <Card.Text className="text-truncate" style={{ maxHeight: "3rem" }}>
              {description}
            </Card.Text>
            <h6 className="fw-bold">₱ {price}</h6>
          </div>

          {/* Push button to bottom */}
          <div className="mt-auto">
            <Button size="sm" variant="outline-dark" className="w-100">
              View
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
