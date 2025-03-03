/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#ff4200',
          dark: '#cc0000',
          light: '#ff9700',
          lighter: '#ffcc00',
        },
        gray: {
          DEFAULT: '#666666',
          light: '#a4a4a4',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            p: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul, ol': {
              marginLeft: '1.5em',
            },
            a: {
              color: 'inherit',
              textDecoration: 'none',
            },
            strong: {
              fontWeight: '600',
            },
            hr: {
              borderColor: 'inherit',
              marginTop: '1em',
              marginBottom: '1em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}