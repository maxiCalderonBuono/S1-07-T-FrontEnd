import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { ImHammer2 } from "react-icons/im";
import * as styles from "../atoms/Buttons/buttonStyles";
import Button from "../atoms/Buttons/Button";

import { useDispatch, useSelector } from "react-redux";
import { uiOpenLogin, uiOpenRegister } from "../../actions/modal";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import { startLogout } from "../../actions/auth";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  //Hago el dispatch de la apertura del modal de Login y Registro
  const dispatch = useDispatch();

  const { isAutho, username, image } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const openLogin = () => {
    dispatch(uiOpenLogin());
  };

  const OpenRegister = () => {
    dispatch(uiOpenRegister());
  };
  return (
    <>
      <LoginScreen />
      <RegisterScreen />
      <div className="fixed top-0 left-0 z-20 w-full shadow-md">
        <div className="md:flex items-center justify-between bg-[#3196DA] py-2 md:px-10 px-7">
          <Link to="/">
            <div className="flex items-center text-2xl cursor-pointer ">
              <img
                src="https://res.cloudinary.com/dvqlenul5/image/upload/v1649261563/logo_white_pbwilp.png"
                alt="Mejor postor"
                className="w-12"
              />
              <p className="hidden ml-3 text-2xl font-bold text-white lg:block">
                Mejor postor
              </p>
            </div>
          </Link>

          <div
            onClick={() => setOpenNav(!openNav)}
            className="absolute text-3xl cursor-pointer right-8 top-6 md:hidden"
          >
            {openNav ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
          <div className="flex justify-center ">
            <ul
              className={`md:flex md:shadow-none md:items-center md:bg-[#3196DA] md:pb-0 md:static md:z-auto md:w-auto md:pl-0
            shadow-xl rounded-lg bg-background_main absolute z-[-1] pr-5 pl-5 transition-all duration-500 ease-in ${
              openNav ? "top-20" : " top-[-490px]"
            }`}
            >
              {/* Dropdown User */}

              {isAutho === true ? (
                <>
                  <div className="flex mt-3 md:hidden">
                    <img
                      src={
                        image ||
                        "https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png"
                      }
                      alt="icon-default"
                      className="w-20"
                    />
                    <h1 className="my-auto ml-5 text-xl text-gray-800">
                      {`Bienvenido ${username}`}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between mt-8 md:hidden ">
                    <Link to="/myprofile">
                      <Button
                        styles={`${styles.SUCCESS_BUTTON} p-2 text-xl`}
                        content="Editar perfil"
                      />
                    </Link>
                    <button
                      className="text-white rounded-[43px] bg-danger p-2 text-xl"
                      onClick={() => handleLogout}
                    >
                      Cerrar sesion
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex mt-3 sm:hidden relative min-w-[350px]">
                    <img
                      src="https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png"
                      alt="icon-default"
                      className="w-20 mt-5"
                    />
                    <h1 className="absolute my-auto text-xl text-gray-800 left-24 top-6">
                      Bienvenido a Mejor Postor
                    </h1>
                    <p className="absolute flex w-3/4 text-sm text-left top-14 left-24">
                      Ingresa a tu cuenta para ver tus subastas activas y
                      ofertas
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-8 sm:hidden ">
                    <Button
                      styles={`${styles.PRIMARY_BUTTON} p-2 `}
                      content="Ingresa"
                      setFunction={() => openLogin()}
                    />
                    <Button
                      styles={`${styles.GHOST_BUTTON} p-2 `}
                      content="Crea tu cuenta"
                      setFunction={() => OpenRegister()}
                    />
                  </div>
                </>
              )}

              {/* hr */}
              <hr className="mt-7" />
              {/* Navbar main */}
              {isAutho === true ? (
                <>
                  <li key="crear-subasta" className="text-xl sm:ml-4 my-7 ">
                    <Link to="/newbid">
                      <button className="flex items-center text-gray-800 duration-500 cursor-pointer hover:text-gray-500">
                        <ImHammer2 className="mr-1.5" />
                        Crear subasta
                      </button>
                    </Link>
                  </li>
                  <li key="mis-subastas" className="text-xl sm:ml-4 my-7">
                    <Link to="/myauctions">
                      <button className="flex items-center text-gray-800 duration-500 cursor-pointer hover:text-gray-500 ">
                        <FaBriefcase className="mr-1.5" />
                        Mis subastas
                      </button>
                    </Link>
                  </li>
                  <li key="mis-pujas" className="text-xl sm:ml-4 my-7">
                    <Link to="/mybids">
                      <button className="flex items-center text-gray-800 duration-500 cursor-pointer hover:text-gray-500">
                        <GiTakeMyMoney className="mr-1.5" />
                        Mis pujas
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}

              {/* TODO: Si el usuario esta logeado render otro componente */}
              <li className="items-center justify-center hidden duration-500 md:flex md:ml-4 hover:text-gray-500">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ">
                    <div>
                      <Menu.Button className="flex text-sm text-white rounded-full ">
                        <img
                          src={
                            image ||
                            "https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png"
                          }
                          alt="icon-default"
                          className="w-8 h-8 rounded-full"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`absolute right-0 w-64 px-0 py-1 pt-3 pb-3 mt-2 origin-top-right rounded-md shadow-lg bg-background_main min-w-[500px] 
                      ${isAutho === true ? "min-w-[400px]" : "min-w-[500px]"}`}
                      >
                        {isAutho === true ? (
                          <>
                            <Menu.Item>
                              <div className="flex">
                                <img
                                  src={
                                    image ||
                                    "https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png"
                                  }
                                  alt="icon-default"
                                  className="w-16 ml-3.5 rounded-full"
                                />
                                <h1 className="my-auto ml-3 text-xl text-gray-800">
                                  {`Bienvenido ${username}`}
                                </h1>
                              </div>
                            </Menu.Item>

                            <Menu.Item>
                              <div className="flex justify-center">
                                <Link to="/myprofile">
                                  <Button
                                    styles={`${styles.SUCCESS_BUTTON} p-3 text-2xl`}
                                    content="Editar perfil"
                                  />
                                </Link>
                                <button
                                  className="text-white rounded-[43px] bg-danger px-3 my-1 text-xl"
                                  onClick={handleLogout}
                                >
                                  Cerrar sesion
                                </button>
                              </div>
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              <div className="flex mt-3 relative min-w-[500px] ">
                                <img
                                  src="https://res.cloudinary.com/di57h1uhf/image/upload/v1648590723/Mejor%20postor/circle-user-solid_abtmjp.png"
                                  alt="icon-default"
                                  className="w-16 ml-3.5 rounded-full"
                                />
                                <h1 className="absolute my-auto text-xl text-gray-800 left-24">
                                  Bienvenido a Mejor Postor
                                </h1>
                                <p className="absolute flex w-3/4 text-sm text-left top-10 left-24">
                                  Ingresa a tu cuenta para ver tus subastas
                                  activas y ofertas
                                </p>
                              </div>
                            </Menu.Item>

                            <Menu.Item>
                              <div className="flex justify-center">
                                <Button
                                  styles={`${styles.PRIMARY_BUTTON} p-3 text-2xl`}
                                  content="Iniciar"
                                  setFunction={() => openLogin()}
                                />
                                <Button
                                  styles={`${styles.GHOST_BUTTON} p-3  text-2xl`}
                                  content="Crear cuenta"
                                  setFunction={() => OpenRegister()}
                                />
                              </div>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
