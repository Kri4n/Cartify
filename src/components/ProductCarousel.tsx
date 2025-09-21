"use client";

import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import FirstImage from "../assets/images/bag.jpg";
import SecondImage from "../assets/images/tshirt.jpg";
import ThirdImage from "../assets/images/watch.jpg";

function ProductCarousel() {
  return (
    <div className="p-3">
      <h1 className="fw-bold">New Releases</h1>
      <Carousel>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src={FirstImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Lorem</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src={SecondImage}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Lorem</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="carousel-image Image-fluid"
            src={ThirdImage}
            alt="Third slide"
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
