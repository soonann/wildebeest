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
            },
            animation: {
                tilt: 'tilt 2s forwards',
            },
            keyframes: {
                tilt: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-5.13deg)' },
                }
            }
        },

    },
    plugins: [],
}


