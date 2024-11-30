import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--space-sm) 0;
  background: ${props => props.scrolled ? props.theme.background + 'ee' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  width: min(var(--container-width), 100% - var(--container-padding) * 2);
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  text-decoration: none;
  
  span {
    background: ${props => props.theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: var(--space-md);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.gradient};
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: var(--space-xs);
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.background};
  padding: var(--space-xl);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Skills', href: '/skills' },
  { title: 'Projects', href: '/projects' },
  { title: 'Contact', href: '/contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <NavContainer
        scrolled={scrolled}
        theme={currentTheme}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContent>
          <Logo
            to="/"
            theme={currentTheme}
            onClick={() => handleNavClick('/')}
          >
            Port<span>folio</span>
          </Logo>

          <NavLinks>
            {navItems.map((item, i) => (
              <NavLink
                key={item.title}
                to={item.href}
                theme={currentTheme}
                className={location.pathname === item.href ? 'active' : ''}
                onClick={() => handleNavClick(item.href)}
              >
                {item.title}
              </NavLink>
            ))}
          </NavLinks>

          <MobileMenuButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            theme={currentTheme}
          >
            {navItems.map((item, i) => (
              <NavLink
                key={item.title}
                to={item.href}
                theme={currentTheme}
                onClick={() => handleNavClick(item.href)}
                className={location.pathname === item.href ? 'active' : ''}
              >
                {item.title}
              </NavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
