/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['aeonik'],
        'aeonik-bold': ['aeonik-bold'],
        'aeonik-light': ['aeonik-light'],
        'aeonik-medium': ['aeonik-medium'],
      },
      colors: {
        customBlue: '#0560FA',
        customdarkBlue: '#005ECE',
        customGray: '#A7A7A7',
        customGolden: '#EDC448',
        customBlack: '#000D1D',
        customlightGray: '#CFCFCF',
        customeFilled: '#EC8000',
        customOffwhite: '#F2F2F2',
        customdarkCard: '#001B3B',
      },
    },
  },
  plugins: [],
};
