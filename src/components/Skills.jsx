import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaAws, FaJs } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiGraphql, SiJavascript, SiExpress } from 'react-icons/si';

const SkillsSection = styled.section`
  padding: 6rem 0;
  position: relative;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary}40,
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary}40,
      transparent
    );
  }
`;

const SkillsContainer = styled(motion.div)`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  padding: 3rem 0;

  &::before, &::after {
    font-family: 'La Belle Aurore', cursive;
    color: ${({ theme }) => theme.primary}20;
    font-size: 18px;
    position: absolute;
    left: 2rem;
    opacity: 0.8;
  }

  &::before {
    content: '<skills>';
    top: 0;
  }

  &::after {
    content: '</skills>';
    bottom: 0;
  }
`;

const SectionHeading = styled(motion.h2)`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 4rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 2.5rem;
  background: ${({ theme }) => theme.surface}90;
  border-radius: 20px;
  box-shadow: 0 8px 32px ${({ theme }) => theme.shadowColor};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.border}30;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 2rem;
  }
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.background}95;
  border: 1px solid ${({ theme }) => theme.border}20;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradient};
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${({ theme }) => theme.shadowColor};
    border-color: ${({ theme }) => theme.primary}40;

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CategoryHeading = styled(motion.h3)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  padding-left: 20px;
  
  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    left: 5px;
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.background}40;
  border: 1px solid ${({ theme }) => theme.border}20;

  &:hover {
    background: ${({ theme }) => theme.highlightGradient}20;
    transform: translateX(10px);
    border-color: ${({ theme }) => theme.primary}40;
  }

  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const ProgressBar = styled(motion.div)`
  height: 6px;
  background: ${({ theme }) => theme.gradient};
  border-radius: 3px;
  margin-top: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  ${SkillItem}:hover & {
    opacity: 1;
  }
`;

const skillsData = {
  frontend: {
    title: "Frontend Development",
    skills: [
      // { name: "HTML", icon: FaHtml5, level: 90 },
      // { name: "CSS", icon: FaCss3, level: 90 },
      //{ name: "JavaScript", icon: SiJavascript, level: 85 },
      { name: "React", icon: FaReact, level: 85 },
      { name: "javaScript", icon: FaJs, level: 80 },
    ]
  },
  backend: {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 88 },
      { name: "Express.js", icon: SiExpress, level: 88 },
    ]
  },
  database: {
    title: "Database & Storage",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: 85 },
      { name: "Azure", icon: FaAws, level: 75 },
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    y: 20,
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const Skills = () => {
  const { currentTheme } = useTheme();

  return (
    <SkillsSection id="skills" theme={currentTheme}>
      <SkillsContainer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        theme={currentTheme}
      >
        <SectionHeading
          theme={currentTheme}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          Technical Skills
        </SectionHeading>
        
        <SkillsGrid theme={currentTheme}>
          {Object.entries(skillsData).map(([key, category], index) => (
            <SkillCategory
              key={key}
              theme={currentTheme}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryHeading
                theme={currentTheme}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {category.title}
              </CategoryHeading>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem
                  key={skill.name}
                  theme={currentTheme}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.3 + (skillIndex * 0.1)
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <skill.icon />
                  <div style={{ flex: 1 }}>
                    <div>{skill.name}</div>
                    <ProgressBar
                      theme={currentTheme}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (skillIndex * 0.1) }}
                    />
                  </div>
                </SkillItem>
              ))}
            </SkillCategory>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;
