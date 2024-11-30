import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    primary: '#3b82f6',
    secondary: '#10b981',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    border: '#334155',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
    backgroundGradient: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
  },
  light: {
    primary: '#2563eb',
    secondary: '#10b981',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#4b5563',
    border: '#e5e7eb',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
    backgroundGradient: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.dark);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDark');
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'true');
      setCurrentTheme(savedTheme === 'true' ? themes.dark : themes.light);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setCurrentTheme(isDark ? themes.light : themes.dark);
    localStorage.setItem('isDark', (!isDark).toString());
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
