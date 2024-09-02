/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        rubik: ['Rubik', 'sans-serif'], 
      }
    }
  },
  screens: {
    xs: '0',
    mobile: '375px',
    sm: '648px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    largeDesktop: '1440px'
  },
  plugins: []
};
