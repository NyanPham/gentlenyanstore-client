module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in forwards",
        spinner: 'spinner 2s linear infinite',
        modalShow: 'modalShow 0.5s ease-in forwards',
        modalHide: 'modalHide 0.5s ease-in forwards',
        navBar: 'navBar 0.5s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: 'translateY(20px)' },
          "100%": { opacity: 1, transform: 'translateY(0)' } 
        },
        spinner: {
          "0%": { transform: 'rotate(0deg)' },
          "100%": { transform: 'rotate(360deg)' }
        },
        modalShow: {
          "0%": { opacity: 0, transform: 'translateY(-20px) translateX(-50%)' },
          "100%": { opacity: 1, transform: 'translateY(0) translateX(-50%)' }
        },
        modalHide: {
          "0%": { opacity: 1, transform: 'translateY(0) translateX(-50%)' },
          "100%": { opacity: 0, transform: 'translateY(-20px) translateX(-50%)' }
        },
        navBar: {
          "0%": { transform: 'translateY(-100%)'},
          "100%": { transform: 'translateY(0)'}
        }
      },
    },
  },
  variants: {
    animation: ["motion-safe"]
  },
  plugins: [],
}
