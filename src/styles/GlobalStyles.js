import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --space-xs: clamp(0.75rem, 1vw, 1rem);
    --space-sm: clamp(1rem, 2vw, 1.5rem);
    --space-md: clamp(1.5rem, 3vw, 2rem);
    --space-lg: clamp(2rem, 4vw, 3rem);
    --space-xl: clamp(3rem, 6vw, 4rem);
    --space-xxl: clamp(4rem, 8vw, 6rem);
    --container-width: min(1400px, 90vw);
    --container-padding: var(--space-md);
    --section-padding: var(--space-xxl) 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
  }

  main {
    min-height: 100vh;
  }

  section {
    padding: var(--section-padding);
    width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
