import React from "react";
import MainLogo from "../assets/icon-above-font2.png";

const Header = () => {
  return (
    <header className="max-w-sm py-5">
      <img src={MainLogo} alt="Logo groupomania" className="h-24"></img>
    </header>
  );
};

export default Header;
