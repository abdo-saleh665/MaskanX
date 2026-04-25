/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        indigo: {
          600: '#4F46E5',
          700: '#4338CA',
        },
        slate: {
          50: '#F8FAFC',
          500: '#64748B',
          700: '#334155',
          900: '#0F172A',
        }
      }
    },
  },
  plugins: [],
};
