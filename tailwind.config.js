/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'vue-gray': '#242424',
      'vue-blue': '#646CFF',
      'vue-violet': '#EA58D9',
      'vue-pink': '#FF61A2',
      'vue-red': '#FF9071',
      'vue-orange': '#FFC759',
      'vue-yellow': '#F9F871',
      'vue-green': '#00895F',
    }
  },
  plugins: [],
}

