import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <React.Fragment>
      <h1>Capstone</h1>
          <Link to={"/"}>Home</Link> <span> </span>
          <Link to={"/sign-in"}>Sign in</Link>
    </React.Fragment>
  );
}

export default Header;