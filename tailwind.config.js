/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      textColor: {
        "primary": "#000000",
        "secondary": "#8B929B",
        "invert": "#171824",
        "accent": "#5B74E5",
        "menfess": "#5B74E5",
        "mager": "#4DB394",
        "shop": "#FFA500",
      },
      backgroundColor: {
        "base": "#FFFFFF",
        "secondary": "#8B929B",
        "accent": "#5B74E5",
        "menfess": "#5B74E5",
        "mager": "#4DB394",
        "shop": "#FFA500",
      },
      backgroundImage: {
        "blueish-gradient": "var(--blueish-gradient)",
        "accent-gradient": "var(--accent-gradient)",
        "accent-footer-gradient": "var(--accent-footer-gradient)",
      },
      borderColor: {
        "secondary": "#8B929B",
      },
      outlineColor: {
        "secondary": "#8B929B",
      },
      colors: {
      },
      boxShadow: {
      }
    },
  },
  plugins: [],
}