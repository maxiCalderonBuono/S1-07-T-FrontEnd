import toast from "react-hot-toast";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiCloseLogin, uiCloseRegister, uiIsNotLoading } from "./modal";

const login = (user) => ({ type: types.login, payload: user });

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const res = await fetchSinToken("auth/signin", { email, password }, "POST");
    const body = await res.json();

    const data = body.payload;

    if (res.status === 200) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.id);
      const loginToast = toast.loading("Iniciando sesión...");
      dispatch(
        login({
          id: body.payload.id,
          username: body.payload.username,
          email: body.payload.email,
          image: body.payload.image,
        })
      );
      toast.dismiss(loginToast);
      dispatch(uiCloseLogin());
      toast.success(`Bienvenido ${body.payload.username}`);
    } else {
      toast.error(body.message);
    }
  };
};

export const startRegister = (username, password, email, reset) => {
  return async (dispatch) => {
    const res = await fetchSinToken(
      "auth/signup",
      {
        username,
        password,
        email,
        name: "HARCODED",
        surname: "HARCODED",
        birthYear: 1990,
        image:
          "https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png",
      },
      "POST"
    );
    const body = await res.json();

    if (res.status === 200) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("uid", body.data.uid);
      dispatch(uiIsNotLoading());
      dispatch(uiCloseRegister());
      toast.success("Por favor verifica tu correo electronico");
    } else {
      toast.error(body.message);
      dispatch(uiIsNotLoading());
    }
    reset();
  };
};

export const startIsAuth = () => {
  return async (dispatch) => {
    const res = await fetchConToken("auth/renew");
    const body = await res.json();
    if (res.status === 200) {
      localStorage.setItem("token", body.token);
      dispatch(
        login({
          id: body.payload.id,
          username: body.payload.username,
          email: body.payload.email,
          image: body.payload.image,
        })
      );

      dispatch(uiCloseLogin());
    } else {
      console.log("error", body);
      localStorage.removeItem("token");
      dispatch(isAuthoFinish());
    }
  };
};

const isAuthoFinish = () => ({ type: types.isAuthoFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Sesión cerrada");
  };
};
const logout = () => ({ type: types.logout });

export const isValidationFinish = () => ({ type: types.isValidationFinish });
