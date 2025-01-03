/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        jockeyOne: ['"Jockey One"', 'serif'],
        inriaSerif: ['"Inria Serif"', 'serif'],
      },
      gridTemplateRows: {
        'layout': 'max-content 1fr',
      }
    },
  },
  plugins: [],
}

