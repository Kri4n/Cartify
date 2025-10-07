import { CardGroup } from "react-bootstrap";
import PreviewProducts from "./PreviewProducts";

export default async function FeaturedProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/active`,
    {
      cache: "no-store", // ensures fresh data per request
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const products = await res.json();

  // Randomize and pick 5 unique products
  const randomIndexes: number[] = [];
  while (randomIndexes.length < 5 && randomIndexes.length < products.length) {
    const rand = Math.floor(Math.random() * products.length);
    if (!randomIndexes.includes(rand)) randomIndexes.push(rand);
  }

  const featured = randomIndexes.map((i) => products[i]);

  return (
    <div className="bg-light rounded mt-3 p-5 border shadow">
      <h4 className="text-center">Featured Products</h4>
      <CardGroup className="justify-content-center gap-1 mt-4">
        {featured.map((product: any) => (
          <PreviewProducts key={product._id} data={product} />
        ))}
      </CardGroup>
    </div>
  );
}
