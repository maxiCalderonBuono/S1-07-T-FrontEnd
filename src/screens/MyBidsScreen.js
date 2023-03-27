import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MisOfertas } from "../components/organisms/MisOfertas";
import { useFetch } from "../hooks/useFetch";

export const MyBidsScreen = () => {
  const [myBids, setMyBids] = useState([]);

  const token = localStorage.getItem("token");

  const { id } = useSelector((state) => state.auth);

  const URL = `https://postor-api.onrender.com/api/products`;

  const { data, loading } = useFetch(URL, token);

  useEffect(() => {
    if (!loading) {
      const productDetail = data.products.filter(
        (product) => product.bidUser[0] === id
      );
      setMyBids([...productDetail]);
    }
  }, [data, loading, id]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col p-8">
        <div className="flex flex-col items-center justify-center">
          <MisOfertas data={myBids} loading={loading} />
        </div>
      </div>
    </div>
  );
};
