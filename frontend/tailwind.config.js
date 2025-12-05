/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#1a4d7a',
                    dark: '#0f3a5a',
                    light: '#2d6ba3',
                },
                accent: {
                    DEFAULT: '#00d4aa',
                    dark: '#00b894',
                }
            }
        },
    },
    plugins: [],
}
