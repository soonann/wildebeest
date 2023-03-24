const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./lib/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#7A46E8',
                'secondary': '#EDCA5B',
                'quiz-bg': '#282828',
                //'green': '#13ce66',
                //'gray-dark': '#273444',
                //'gray': '#8492a6',
                //'gray-light': '#d3dce6',
            },
        },

    },
    plugins: [],
}


