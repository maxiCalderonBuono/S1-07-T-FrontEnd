import React from "react";
import Button from "../atoms/Buttons/Button";
import * as styles from "../atoms/Buttons/buttonStyles";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../actions/product";
import { useForm } from "../../hooks/userForm";
import toast from "react-hot-toast";

const ProductDetail = ({ detail }) => {
  const {
    _id,
    name,
    image,
    description,
    location,
    category,
    duration,
    highestBid,
    createdAt,
    updatedAt,
    bidUserData,
  } = detail;

  const startAt = new Date(createdAt).toLocaleDateString();

  const renewAt = new Date(updatedAt).toLocaleDateString();

  // const endAt = new Date(duration).toLocaleDateString();

  let endAt2 = duration;

  if (endAt2) {
    endAt2 = endAt2.slice(0, 10).replace(/-/g, "/");
  }

  const dispatch = useDispatch();

  const { id: bidUser } = useSelector((state) => state.auth);

  const [{ bid }, handleInputChange, reset] = useForm({ bid: "" });

  const pushNewBid = (e) => {
    e.preventDefault();
    if (bid < 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }
    if (bid < highestBid) {
      toast.error("El precio debe ser mayor al actual");
      return;
    }

    dispatch(updateProduct(bid, bidUser, _id, reset));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <div className="flex flex-col items-center justify-center w-full m-20">
          <img
            className="w-auto rounded-md border-8 border-[#3196DA] h-60"
            src={image}
            alt={name}
          />
        </div>
        <div className="px-4 m-2 mb-5 rounded-lg bg-black-400">
          <a
            className="text-5xl font-bold text-right text-[#3196DA] item-end"
            href="*"
          >
            {name}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          <div className="p-10 mt-5 font-bold text-white  border rounded-lg bg-[#3196DA]">
            <h3 className="text-2xl text-center border-b-4 md:text-5xl">
              Detalles del producto:
            </h3>
            <div className="flex flex-wrap">
              <div className="mr-20">
                <p className="mt-5 text-sm md:text-lg">
                  Descripción: {description}
                </p>
                <p className="mt-5 text-sm md:text-lg">Ubicación: {location}</p>
                <p className="mt-5 text-sm md:text-lg">Categoría: {category}</p>
              </div>
              <div className="mr-10">
                <p className="mt-5 text-sm text-red-100 md:text-lg">
                  Publicación iniciada el: {startAt}
                </p>
                <p className="mt-5 text-sm text-red-100 md:text-lg">
                  Última actualización: {renewAt}
                </p>
                <p className="mt-5 text-sm text-red-100 md:text-lg">
                  Fecha de finalización: {endAt2}
                </p>
              </div>
            </div>
          </div>
          <div className="items-center justify-center p-10 mt-5 font-bold text-black transition-all transform border rounded-lg bg-slate-100 border-bg-lime-700 hover:scale-125">
            <h3 className="text-2xl text-center text-[#3196DA] border-b-4 border-indigo-500 md:text-5xl">
              PUJA ACTUAL
            </h3>
            <div className="flex flex-col md:flex-wrap">
              <p className="mt-5 mr-3 text-sm text-[#3196DA] md:text-lg">
                USUARIO:{" "}
                {bidUserData ? bidUserData[0]?.username : "No hay usuario"}
              </p>
              <p className="mt-5 mr-3 text-sm text-[#3196DA] md:text-lg">
                FINALIZA EL: {endAt2}
              </p>
              <p className="mt-5 mr-3 text-sm text-green-400 md:text-lg">
                CANTIDAD:{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                  currencyDisplay: "code",
                }).format(highestBid)}
              </p>
              <form
                onSubmit={pushNewBid}
                className="flex flex-col items-center"
              >
                <input
                  name="bid"
                  autoComplete="off"
                  placeholder="tu apuesta"
                  value={bid}
                  onChange={handleInputChange}
                  className="rounded-[43px] border text-text-primary border-text-secondary w-full h-9 text-center mb-3"
                />
                <Button
                  styles={`${styles.SUCCESS_BUTTON} w-full p-1`}
                  content="Pujar"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
