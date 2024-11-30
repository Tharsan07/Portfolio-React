import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route,
  createRoutesFromElements
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { currentTheme } = useTheme();

  return (
    <StyledThemeProvider theme={currentTheme}>
      <>
        <GlobalStyles />
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </Router>
      </>
    </StyledThemeProvider>
  );
}

export default App;
