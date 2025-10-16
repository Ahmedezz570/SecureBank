/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'red',
          foreground: '#FFFFFF',
        },
        secondary: {
  DEFAULT: '#7E3AF2',
  foreground: '#FFFFFF',
},
        card: {
          DEFAULT: '#1E293B',
          foreground: '#F8FAFC',
        },
        background: '#0F172A',
        muted: '#64748B',
      },
    },
  },
  plugins: [],
}
