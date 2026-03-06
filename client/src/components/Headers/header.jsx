import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import ConfirmationModal from "../ConfirmationModal/confirmationModal";
import { useAuth } from "../../context/authContext";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavItem,
  MobileMenuButton,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuTitle,
  CloseButton,
  Overlay,
} from "./headerStyles";

const Header = ({ navItems = [] }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleNavClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path === "/logout") {
      setIsLogoutModalOpen(true);
    } else {
      navigate(item.path);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled} ref={headerRef}>
        <Logo onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="CivicPulse" />
        </Logo>

        <Nav $desktop>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              onClick={() => handleNavClick(item)}
              $active={isActive(item.path)}
            >
              {item.label}
            </NavItem>
          ))}
        </Nav>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </MobileMenuButton>
      </HeaderContainer>

      <Overlay
        $open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      <MobileMenu $open={mobileMenuOpen} ref={mobileMenuRef}>
        <MobileMenuHeader>
          <MobileMenuTitle>Menu</MobileMenuTitle>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </MobileMenuHeader>
        <Nav>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              onClick={() => {
                handleNavClick(item);
                setMobileMenuOpen(false);
              }}
              $active={isActive(item.path)}
            >
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              {item.label}
            </NavItem>
          ))}
        </Nav>
      </MobileMenu>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        type="logout"
        isLoading={isLoggingOut}
      />
    </>
  );
};

export default Header;
