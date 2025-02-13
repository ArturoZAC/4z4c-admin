import { ProductCard } from "./products";
import { products } from "./products/data/products";

export const App = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* {
        products.map( ( product ) => (
          <ProductCard {...product}/>
        ))
      } */}
    </div>
  );
}
