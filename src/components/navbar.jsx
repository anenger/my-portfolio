import * as React from "react";

import NavItem from "./navItem";
import { AiOutlineMenu } from "react-icons/ai";
import { useWidth } from "../hooks/useWidth";

import {
  navBox,
  navLinks,
  burgerDiv,
  burgerDivSlide,
  burgerIcon,
} from "./navbar.module.css";

const Navbar = () => {
  const elements = [
    { Home: "#title" },
    { About: "#about" },
    { Work: "#work" },
    { Photos: "#projects" },
  ];

  const width = useWidth();
  const isMobile = width < 800;

  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const menuElements = elements.map((value, index) => (
    <NavItem
      link={Object.values(value)[0]}
      title={Object.keys(value)[0]}
      index={index}
      menuCallback={handleClick}
    ></NavItem>
  ));

  return (
    <nav className={navBox}>
      {isMobile ? (
        <>
          <div className={burgerIcon}>
            <AiOutlineMenu onClick={handleClick} />
          </div>
          <ul
            className={
              isOpen ? `${burgerDiv} ${burgerDivSlide}` : `${burgerDiv}`
            }
          >
            {menuElements}
          </ul>
        </>
      ) : (
        <ul className={navLinks}>{menuElements}</ul>
      )}
    </nav>
  );
};

export default Navbar;
