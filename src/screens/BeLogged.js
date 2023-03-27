import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/atoms/Buttons/Button";
import * as styles from "../components/atoms/Buttons/buttonStyles";

function BeLogged() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold">
        Inicia sesión para ver esta sección
      </h1>

      <img
        className="xl: h-[60%]"
        src="https://res.cloudinary.com/dvqlenul5/image/upload/v1656419993/accounts___user_users_profile_account_man_people_website_browser_webpage_mn77ws.svg"
        alt="You have to be logged"
      />

      <Link to="/">
        <Button
          styles={`${styles.PRIMARY_BUTTON} p-2 text-xl`}
          content="Iniciar sesión"
        />
      </Link>
    </div>
  );
}

export default BeLogged;
