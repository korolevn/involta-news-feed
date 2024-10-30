/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        fontFamily: {
            sans: ["Arial", "sans-serif"],
        },
        container: {
            center: true,
            screens: {
                sm: "600px",
                md: "768px",
                lg: "1060px",
            },
            padding: {
                DEFAULT: "20px",
            },
        },
        extend: {
            colors: {
                blue: "#0029FF",
                main: "#FBFBFB",
                "gray-lt": "#E5E5E5",
                "gray-md": "#DCDCDC",
                gray: "C4C4C4",
            },
            boxShadow: {
                xs: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
            },
        },
    },
    plugins: [],
};
