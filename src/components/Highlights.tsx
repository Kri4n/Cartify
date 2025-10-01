"use client";

import { Row, Col, Card } from "react-bootstrap";
import Image from "next/image";

export default function Highlights() {
  return (
    <Row className="my-3 d-flex flex-sm-column flex-md-row flex-lg-row flex-xl-row gap-sm-2 gap-2 gap-md-0">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 bg-dark text-white">
          <Card.Body>
            <Card.Title className="d-flex">
              <Image
                src="/30-day-return.png"
                alt={"30-day-return"}
                width={120}
                height={100}
              />
              <h2>30-Days Return Window</h2>
            </Card.Title>
            <Card.Text>
              Customers can return products within 30 days of receiving their
              order. All returned items must be in new, unused condition with
              original packaging and tags intact. Once returned, a full refund
              or exchange will be issued, depending on customer preference.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 bg-dark text-white">
          <Card.Body>
            <Card.Title className="d-flex">
              <Image
                src="/Free-return.png"
                alt={"Free-return"}
                width={120}
                height={100}
              />
              <h2>Free Returns on Eligible Items</h2>
            </Card.Title>
            <Card.Text>
              For most products, we offer free returns and exchanges. Simply use
              our prepaid return shipping label, and send the item back to us.
              Items must meet our return conditions, including being unused and
              in original packaging.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3 bg-dark text-white">
          <Card.Body>
            <Card.Title className="d-flex">
              <Image
                src="/Easy-exchange.png"
                alt={"Easy-exchange"}
                width={120}
                height={100}
              />
              <h2>Easy Exchange Process</h2>
            </Card.Title>
            <Card.Text>
              If you're not satisfied with your purchase, we offer an easy
              exchange process. You can select an exchange for a different size,
              color, or item by contacting our customer support team. Once your
              return is processed, we’ll ship your exchange at no extra charge.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
