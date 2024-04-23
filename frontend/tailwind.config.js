/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    /* Content where to be used */
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    /* All styling that replaces the Tailwind styling/classes comes outside extend */
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      lato: ['Lato', 'sans-serif'],
    },
    fontSize: {
      headingOne: ['2.25rem', { lineHeight: '1.2' }],
      headingTwo: ['1.625rem', { lineHeight: '1.1' }],
      headingThree: ['1rem', { lineHeight: '1.5' }],
      readText: ['1rem', { lineHeight: '1.5' }],
      smallText: ['.813rem', { lineHeight: '1.4' }],
    },
    extend: {
      /* All styling that extends the Tailwind styling/classes */
      colors: {
        /* sa - smart agenda */
        sa_primary: {
          100: 'hsla(231, 36%, 78%, 100)',
          200: 'hsla(238, 11%, 61%, 100)',
          300: 'hsla(223, 100%, 63%, 100)',
          400: 'hsla(220, 53%, 15%, 100)',
        },
        sa_secondary: 'hsla(141, 70%, 51%, 100)',
        sa_error: 'hsla(5, 88%, 57%, 100)',
        sa_bright: 'hsla(0, 0%, 99%, 100)',
        sa_dark: 'hsla(220, 53%, 15%, 100)',
      },
      spacing: {
        xs: '.625rem',
        s: '1.25rem',
        m: '1.875rem',
        l: '2.875rem',
        xl: '3.5rem',
      },
      borderRadius: {
        none: '0',
        base: '.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
