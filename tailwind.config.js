/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans"'],
      'logo': ['Sen'],
    },
    extend: {
      colors:{
        'custom-grey': '#1a1a1a',
        'custom-purple': '#6320EE',
        'newBlue':'#5E6870',
        'green': '#1DB954',
        'dark-green': '#179945',
        'dark-grey': '#191414',
        'grey-1': '#B3B3B3',
        'light-grey': '#323232',
        'yellow': '#FFFF00',
        'blue': '#1aa7ec',
      }
    },
    fontSize: {
      'sm-1': '0.25rem',
      'sm-2': '0.5rem',
      'sm-3': '0.75rem',
      'sm-4': '1rem',
      sm: '1.25rem',
      base: '1.5rem',
      lg: '2rem',
      xl: '2.25rem',
      '2xl': '2.75rem',
      '3xl': '3.25rem',
      '4xl': '3.751rem',
      '5xl': '4.25rem',
    },
    
  },
  plugins: [],
}