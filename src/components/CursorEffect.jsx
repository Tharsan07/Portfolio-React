import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const rippleAnimation = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
`;

const Cursor = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.theme.primary}88;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.1s ease;
  transform: translate(-50%, -50%);
  backdrop-filter: invert(0.2);
  mix-blend-mode: difference;

  &.hovering {
    width: 40px;
    height: 40px;
    background: ${props => props.theme.primary}44;
    animation: ${pulseAnimation} 1.5s ease-in-out infinite;
  }
`;

const CursorTrail = styled.div`
  width: 10px;
  height: 10px;
  background: ${props => props.theme.primary}44;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transition: width 0.2s, height 0.2s;
  transform: translate(-50%, -50%);
  
  &.hovering {
    width: 20px;
    height: 20px;
  }
`;

const RippleEffect = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9997;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: ${rippleAnimation} 1s ease-out forwards;
`;

const CursorEffect = () => {
  const { currentTheme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Delayed trail effect
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleClick = (e) => {
      setClicked(true);
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prevRipples) => [...prevRipples, newRipple]);
      setTimeout(() => {
        setRipples((prevRipples) => 
          prevRipples.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);
      setTimeout(() => setClicked(false), 150);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('click', handleClick);

    // Add hover detection for interactive elements
    const elements = document.querySelectorAll('button, a, .clickable');
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    });

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('click', handleClick);
      
      elements.forEach(element => {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      });
    };
  }, []);

  return (
    <>
      <Cursor
        theme={currentTheme}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.9 : 1})`,
        }}
        className={isHovering ? 'hovering' : ''}
      />
      <CursorTrail
        theme={currentTheme}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
        className={isHovering ? 'hovering' : ''}
      />
      {ripples.map((ripple) => (
        <RippleEffect
          key={ripple.id}
          theme={currentTheme}
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;
