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
  burgerIconSelected,
} from "./navbar.module.css";

const Navbar = ({ isPageLoaded, refs }) => {
  const elements = [
    { Home: refs[0] },
    { About: refs[1] },
    { Work: refs[2] },
    { Photos: refs[3] },
  ];

  const width = useWidth();
  const isMobile = width < 800;
  const [isOpen, setIsOpen] = React.useState(false);

  const hamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  const scrollToElement = (index) => {
    const ref = Object.values(elements[index])[0];
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const menuElements = elements.map((value, index) => (
    <NavItem
      title={Object.keys(value)[0]}
      index={index}
      onClick={scrollToElement}
      isPageLoaded={isPageLoaded}
      isMobile={isMobile}
    ></NavItem>
  ));

  return (
    <nav className={navBox}>
      {isMobile ? (
        <>
          <button
            className={
              isOpen ? `${burgerIcon} ${burgerIconSelected}` : `${burgerIcon}`
            }
            aria-label="Menu"
          >
            <AiOutlineMenu onClick={hamburgerClick} />
          </button>
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
