/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container:{
      center:true,
      padding:{
        default:"1rem",
        sm:"1rem",
        md:"2rem",
        lg:"2rem",
        xl:"2rem",
      },
    },
    screens:{
      sm:"380px",
      md:"768px",
      lg:"1024px",
      xl:"1280",
    },
    extend: {
      animation:{
        animation: "spin 1,5s linear infinite"
      }
    },
  },
  plugins: [],
};
