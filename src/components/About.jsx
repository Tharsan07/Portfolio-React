import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xxl) 0;
  background-color: ${props => props.theme.background};
  position: relative;
  overflow: hidden;
`;

const AboutContainer = styled.div`
  width: min(var(--container-width), 100% - var(--container-padding) * 2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xxl);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  aspect-ratio: 1;
  background: ${props => props.theme.gradient};
  padding: 4px;

  @media (max-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.theme.gradient};
    opacity: 0.5;
    z-index: -1;
    filter: blur(20px);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  justify-content: center;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

const SubTitle = styled(motion.h3)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${props => props.theme.textSecondary};
  margin: 0;
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.8;
  color: ${props => props.theme.textSecondary};
  margin: 0;
`;

const BackgroundPattern = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    ${props => props.theme.primary}11 1px,
    transparent 1px
  );
  background-size: 50px 50px;
  opacity: 0.5;
  z-index: 0;
`;

const HighlightBox = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.border};
  border-radius: 15px;
  padding: var(--space-lg);
  margin-top: var(--space-md);
  
  h4 {
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
    margin: 0 0 var(--space-sm) 0;
  }
  
  p {
    font-size: 1rem;
    color: ${props => props.theme.textSecondary};
    margin: 0;
    line-height: 1.6;
  }
`;

const About = () => {
  const { currentTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <AboutSection id="about" theme={currentTheme}>
      <BackgroundPattern 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      
      <AboutContainer>
        <ImageContainer
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ProfileImage
            src="/path/to/your/image.jpg"
            alt="Profile"
          />
        </ImageContainer>

        <ContentContainer
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Title theme={currentTheme}>
            About Me
          </Title>
          
          <SubTitle theme={currentTheme}>
            Crafting Digital Experiences
          </SubTitle>
          
          <Description theme={currentTheme}>
            I'm a passionate full-stack developer with a keen eye for design and a 
            love for creating seamless user experiences. With expertise in modern 
            web technologies, I bring ideas to life through clean, efficient code 
            and intuitive interfaces.
          </Description>

          <HighlightBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>My Approach</h4>
            <p>
              I believe in creating solutions that not only solve problems but also 
              delight users. Every project is an opportunity to push boundaries and 
              learn something new.
            </p>
          </HighlightBox>

          <HighlightBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4>What I Bring</h4>
            <p>
              A blend of technical expertise and creative problem-solving, coupled 
              with a commitment to delivering high-quality, scalable solutions that 
              make a difference.
            </p>
          </HighlightBox>
        </ContentContainer>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
