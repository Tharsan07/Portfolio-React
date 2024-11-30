import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaAws, FaDocker, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPython, SiDjango, SiFlask, SiBlender, SiWebgl, SiUnrealengine } from 'react-icons/si';
import landingPageImage from '../assets/projects/project-landing-page.jpg';
import ecommerceImage from '../assets/projects/project-ecommerce.jpg';
import devopsImage from '../assets/projects/project-devops.jpg';
import chatbotImage from '../assets/projects/project-chatbot.jpg';
import collaborationImage from '../assets/projects/project-collaboration.jpg';
import dataVizImage from '../assets/projects/project-data-viz.jpg';

const ProjectsSection = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.background};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at top right, 
      ${({ theme }) => theme.primary}20, 
      transparent 50%
    );
    transform: rotate(-45deg);
    z-index: 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ProjectFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${({ active, theme }) => 
    active ? theme.gradient : theme.surface};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${({ theme }) => theme.primary}33;
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadowColor};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const Projects = () => {
  const { currentTheme } = useTheme();
  
  const projects = [
    {
      id: 1,
      title: "Password Generator",
      description: "A front-end password generator creates strong, random passwords to enhance security through a user-friendly interface.",
      image: ecommerceImage,
      tech: ["Html", "Css", "Javascript"],
      github: "https://github.com/yourusername/ecommerce",
      live: "https://ecommerce-demo.com"
    },
    {
      id: 2,
      title: "AI-Powered Chatbot",
      description: "An intelligent chatbot using natural language processing to provide customer support and engagement.",
      image: chatbotImage,
      tech: ["Html", "Css", "Javascript"],
      github: "https://github.com/yourusername/chatbot",
      live: "https://chatbot-demo.com"
    },
    {
      id: 3,
      title: "Developer kit ",
      description: "A developer kit, also known as a software development kit (SDK), is a collection of tools, libraries, documentation, and sample code that helps developers build, test, and deploy applications for a specific platform or framework.",
      image: devopsImage,
      tech: ["Html", "Css", "Javascript"],
      github: "https://github.com/yourusername/devops",
      live: "https://devops-demo.com"
    },
    {
      id: 4,
      title: "Weather Prediction",
      description: "Interactive dashboard for visualizing complex datasets with real-time updates and filtering.",
      image: dataVizImage,
      tech: ["D3.js", "React", "Node.js", "PostgreSQL"],
      github: "https://github.com/yourusername/data-viz",
      live: "https://data-viz-demo.com"
    }
  ];

  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Here are some of my recent works
        </SectionSubtitle>
      </SectionHeader>

      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ProjectImage>
              <img src={project.image} alt={project.title} />
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </TechStack>
              <ProjectLinks>
                <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View Code
                </ProjectLink>
                <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectsSection>
  );
};

export default Projects;
