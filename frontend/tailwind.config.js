/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    /* Content where to be used */
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  /* Enable darkmode trough dark: selector */
  darkMode: 'selector',
  variants: {
    extend: {
      flexDirection: ['hover', 'focus'],
    },
  },
  theme: {
    /* All styling that replaces the Tailwind styling/classes comes outside extend */
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
      lato: ['Lato', 'sans-serif'],
    },
    fontSize: {
      headingOne: ['clamp(2rem, 5vw, 2.25rem)', { lineHeight: '1.2' }],
      headingTwo: ['clamp(1.5rem, 4vw, 1.625rem)', { lineHeight: '1.1' }],
      headingThree: ['clamp(.9rem, 3vw, 1rem)', { lineHeight: '1.5' }],
      readText: ['clamp(.9rem, 3vw, 1rem)', { lineHeight: '1.5' }],
      smallText: ['clamp(.8rem, 2vw, .813rem)', { lineHeight: '1.4' }],
    },
    screens: {
      /* Screen sizes */
      mobile: '375px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px',
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
        sa_secondary: {
          100: 'hsla(141, 70%, 51%, 100)',
          200: 'hsla(141, 70%, 36%, 100)',
        },
        sa_error: {
          100: 'hsla(5, 88%, 57%, 100)',
          200: 'hsla(5, 88%, 30%, 100)',
        },
        sa_bright: 'hsla(0, 0%, 99%, 100)',
        // sa_bright: 'hsla(var(--sa_bright))',
        sa_dark: 'hsla(240, 3%, 12%, 100)',
        // sa_dark: 'hsla(var(--sa_dark))',
      },
      padding: {
        base: '1.5rem',
        btnX: '1.125rem',
        btnY: '0.563rem',
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
