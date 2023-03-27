import React, { useEffect, useState } from "react";
import { deleteProduct } from "../actions/product";
import Novedades from "../components/organisms/Novedades";
import UltimoAviso from "../components/organisms/UltimoAviso";
import { getDiffDate } from "../helpers/getDiffDate";
import { useFetch } from "../hooks/useFetch";

const MainScreen = () => {
  const URL = "https://postor-api.onrender.com/api/products";

  const { data, loading } = useFetch(URL);

  const [latest, setLatest] = useState([]);
  const [active, setActive] = useState([]);

  useEffect(() => {
    const now = new Date();

    if (!loading) {
      const productDetail = data.products.filter(
        (product) =>
          getDiffDate(product.duration, now) === 1 && !product.deleted
      );
      setLatest([...productDetail]);
    }
  }, [data, loading]);

  useEffect(() => {
    const now = new Date();

    if (!loading) {
      const productDetail = data.products.filter(
        (product) => getDiffDate(product.duration, now) > 0 && !product.deleted
      );
      setActive([...productDetail]);
    }
  }, [data, loading]);

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-col items-center justify-center">
        <Novedades data={active} loading={loading} />
      </div>

      <div>
        <UltimoAviso data={latest} loading={loading} />
      </div>
    </div>
  );
};
export default MainScreen;
