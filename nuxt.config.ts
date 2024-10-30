// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "nuxt-icons",
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@nuxt/fonts",
        "@pinia/nuxt",
        "@nuxt/icon",
    ],
    devServer: {
        port: 8000,
    },
});
