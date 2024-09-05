/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {},
      // Custom scrollbar utilities
      scrollbarWidth: {
        hide: 'none', // For Firefox
      },
      scrollbar: {
        hide: {
          '-webkit-scrollbar': 'none', // For WebKit browsers
          '-ms-overflow-style': 'none', // For IE and Edge
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      addUtilities(
        {
          '.hide-scrollbar': {
            '-ms-overflow-style': 'none', /* IE and Edge */
            'scrollbar-width': 'none', /* Firefox */
          },
          '.hide-scrollbar::-webkit-scrollbar': {
            'display': 'none', /* WebKit browsers */
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
};
