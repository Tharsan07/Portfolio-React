import React, { useRef, useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import * as random from 'maath/random/dist/maath-random.esm';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const HeroContent = styled.div`
  width: min(var(--container-width), 100% - var(--container-padding) * 2);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  padding: var(--space-xl) 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const PreTitle = styled(motion.span)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Role = styled(motion.h2)`
  font-size: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${({ primary, theme }) => primary ? theme.gradient : 'transparent'};
  color: ${({ primary, theme }) => primary ? '#fff' : theme.text};
  border: 2px solid ${({ primary, theme }) => primary ? 'transparent' : theme.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px ${({ theme }) => theme.shadowColor};
  }
`;

const AnimatedCanvas = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloatingElement = styled(motion.div)`
  width: 400px;
  height: 400px;
  background: ${({ theme }) => theme.gradient};
  opacity: 0.1;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

function Stars() {
  const ref = useRef();
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const radius = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Hero = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <HeroSection>
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </CanvasContainer>

      <HeroContent>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PreTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to my portfolio
          </PreTitle>
          
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Tharsan
          </Name>
          
          <Role
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Full Stack Developer
          </Role>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            I create exceptional digital experiences through innovative web solutions. 
            Specializing in modern web technologies and creative problem-solving.
          </Description>

          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button
              as={motion.button}
              primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              Get in Touch
            </Button>
          </ButtonContainer>
        </TextContent>

        <AnimatedCanvas
          style={{ y, opacity }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <FloatingElement
            animate={{
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%"
              ]
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </AnimatedCanvas>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
