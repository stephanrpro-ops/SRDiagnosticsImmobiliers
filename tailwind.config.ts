import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ralBlue: '#0055A4',
        ralWhite: '#F9FBFF',
        ralBlack: '#0B0B0B'
      }
    }
  },
  plugins: []
};

export default config;
