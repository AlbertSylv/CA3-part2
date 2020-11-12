import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  function LinkMaker({ text, path }) {
    return (
      <li className="nav-item">
        <Link to={`/${path}`} className="nav-links" onClick={closeMobileMenu}>
          {text}
        </Link>
      </li>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            BANDEN
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <LinkMaker text="Home" path="" />
            <LinkMaker text="Services" path="services" />
            <LinkMaker text="Products" path="products" />
            <li>
              <Link
                to="/signin"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                SING IN
              </Link>
            </li>
          </ul>

          {button && (
            <Link to="signin" className="btn-mobile">
              <Button buttonStyle="btn--outline" link="/signin">
                SING IN
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
