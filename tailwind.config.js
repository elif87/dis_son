/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B4899',
        },
        secondary: {
          DEFAULT: '#00A69C',
        },
      },
      animation: {
        'width-expand': 'width-expand 0.8s ease-out forwards',
      },
      keyframes: {
        'width-expand': {
          '0%': { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 