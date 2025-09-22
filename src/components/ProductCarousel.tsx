"use client";

import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

function ProductCarousel() {
  return (
    <div className="p-3">
      <h1 className="fw-bold">New Releases</h1>
      <Carousel>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src="/bag.jpg"
            alt="First slide"
            width={500}
            height={500}
          />
          <Carousel.Caption>
            <h3>Lorem</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src="/tshirt.jpg"
            alt="Second slide"
            width={500}
            height={500}
          />
          <Carousel.Caption>
            <h3>Lorem</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src="/watch.jpg"
            alt="Third slide"
            width={500}
            height={500}
          />
          <Carousel.Caption>
            <h3>Lorem</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ProductCarousel;
