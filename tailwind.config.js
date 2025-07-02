/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ph-orange': '#da552f',
        'ph-gray': '#4b587c',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dotted': 'radial-gradient(circle, #33333322 1px, transparent 1px)',
        'striped': 'linear-gradient(45deg, #33333322 25%, transparent 25%, transparent 50%, #33333322 50%, #33333322 75%, transparent 75%, transparent)',
        'zigzag': 'linear-gradient(135deg, #ffffff 25%, transparent 25%) 0 0, linear-gradient(225deg, #ffffff 25%, transparent 25%) 0 0, linear-gradient(315deg, #ffffff 25%, transparent 25%) 0 0, linear-gradient(45deg, #ffffff 25%, transparent 25%) 0 0',
      },
      backgroundSize: {
        'dotted-sm': '10px 10px',
        'dotted-md': '20px 20px',
        'striped-sm': '10px 10px',
        'striped-md': '20px 20px',
        'zigzag-sm': '10px 10px',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
} 