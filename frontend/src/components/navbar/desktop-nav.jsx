import React from "react";
import { Link } from "react-scroll";
// SCSS
import "./navbar.scss";
// Assets
import LogoAwan from "../../assets/navbar/logo-awan.png";
import MobileMenuIcon from "../../assets/navbar/mobile-menu.svg";

const desktopNav = (props) => (
  <nav className={`Navbar ${!props.userIsScrolled ? "extraLargeNavbar" : ""}`}>
    <div className="wrapper flex-s-between">
      <div>
        <Link to="hero" spy={true} smooth={true} offset={0} duration={500}>
          <img
            src={LogoAwan}
            alt="logo"
            className="pointer"
            style={{ width: "100px", height: "auto" }} // adjust width as needed
          />
        </Link>
      </div>
      <div className="mobile__menu" onClick={props.mobileMenuOpen}>
        <img src={MobileMenuIcon} alt="menu" />
      </div>
      <div className="desktop__menu">
        <ul className="flex-s-between">
          <li>
            <Link
              activeClass="active-link"
              to="hero"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              HELLO
            </Link>
          </li>
          <li>
            <Link
              activeClass="active-link"
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              activeClass="active-link"
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default desktopNav;
