import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelopeOpenText,
  FaRocket,
  FaHandshake
} from 'react-icons/fa';
import { 
  SiGmail, 
  SiUpwork, 
  SiFreelancer 
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  {
    name: 'Email',
    icon: SiGmail,
    link: 'mailto:your.email@gmail.com',
    color: '#EA4335'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    link: 'https://linkedin.com/in/your-profile',
    color: '#0077B5'
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    link: 'https://github.com/your-username',
    color: '#333'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    link: 'https://twitter.com/your-handle',
    color: '#1DA1F2'
  },
 
];

const ContactSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-xl) 0;
  background: ${props => props.theme.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at top right, 
      ${props => props.theme.primary}20, 
      transparent 50%
    );
    transform: rotate(-45deg);
    z-index: 0;
  }
`;

const ContentContainer = styled(motion.div)`
  width: min(800px, 90%);
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--space-xl);
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
`;

const SocialGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
  width: 100%;
  margin: 0 auto;
  padding: var(--space-lg);
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: 12px;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => props.theme.shadowColor}22;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px ${props => props.theme.shadowColor}44;
    
    svg {
      color: ${props => props.$color};
      transform: scale(1.2) rotate(360deg);
    }
  }

  svg {
    font-size: 2rem;
    transition: all 0.3s ease;
    color: ${props => props.theme.textSecondary};
  }
`;

const SocialText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const Contact = () => {
  const { currentTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ContactSection theme={currentTheme}>
      <ContentContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title
          theme={currentTheme}
          variants={itemVariants}
        >
          <FaHandshake /> Let's Connect <FaRocket />
        </Title>

        <SocialGrid
          theme={currentTheme}
          variants={containerVariants}
        >
          {socialLinks.map((social) => (
            <SocialLink
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              theme={currentTheme}
              $color={social.color}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon />
              <SocialText>{social.name}</SocialText>
            </SocialLink>
          ))}
        </SocialGrid>
      </ContentContainer>
    </ContactSection>
  );
};

export default Contact;
