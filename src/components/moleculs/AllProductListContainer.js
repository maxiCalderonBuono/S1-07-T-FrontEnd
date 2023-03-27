import React from "react";
import { useState, useEffect } from "react";
import AllProductList from "./AllProductList";

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const URL = "https://postor-api.onrender.com/api/products";

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
      });
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <AllProductList products={products} />
    </div>
  );
};

export default ProductListContainer;
