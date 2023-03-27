import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/atoms/Buttons/Button";
import * as styles from "../components/atoms/Buttons/buttonStyles";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold">404 Not Found</h1>

      <img
        className="xl: h-[60%]"
        src="https://res.cloudinary.com/dvqlenul5/image/upload/v1656188970/error_web_development___website_webpage_browser_alert_warning_meltdown_danger_b4k8xv.svg"
        alt="404notfound"
      />

      <Link to="/">
        <Button
          styles={`${styles.GHOST_BUTTON} p-2 text-xl`}
          content="Go Home"
        />
      </Link>
    </div>
  );
}

export default NotFound;
