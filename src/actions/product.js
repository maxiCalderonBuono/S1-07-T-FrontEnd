import toast from "react-hot-toast";

import { fetchConToken, fetchConTokenMP } from "../helpers/fetch";

export const createProduct = (newAuction, reset) => {
  return async (dispatch) => {
    const res = await fetchConToken(
      "products/",
      { ...newAuction, highestBid: newAuction.initialPrice },
      "POST"
    );
    const body = await res.json();

    if (res.status === 200) {
      toast.success("Publicación creada con éxito");
      reset();
      window.location.reload(true);
      return redirect("/");
    } else {
      toast.error(body.message);
    }
  };
};

export const updateProduct = (bid, bidUser, _id, reset) => {
  return async (dispatch) => {
    const res = await fetchConToken(
      `products/${_id}`,
      { highestBid: bid, bidUser },
      "PUT"
    );

    const body = await res.json();

    if (res.status === 200) {
      toast.success("Tu oferta fue enviada con éxito");
      reset();
      window.location.reload(true);
    } else {
      toast.error(body.message);
    }
  };
};

export const deleteProduct = (_id) => {
  return async (dispatch) => {
    const res = await fetchConToken(`products/${_id}`, {}, "DELETE");
    const body = await res.json();

    if (res.status === 200) {
      toast.success("Tu subasta fue eliminada con éxito");
      window.location.reload(true);
    } else {
      toast.error(body.message);
    }
  };
};

export const purchaseProduct = (highestBid, username, email) => {
  const unit_price = highestBid;

  return async (dispatch) => {
    const res = await fetchConTokenMP(
      `payment/`,
      { unit_price, username, email },
      "POST"
    );
    const body = await res.json();

    if (res.status === 200) {
      toast.success("Compra realizada con éxito");
      return redirect(body);
    } else {
      toast.error(body.message);
    }
  };
};

const redirect = (redirectUrl) => {
  window.location = redirectUrl;
};
