// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "@vueuse/nuxt",
        "@nuxt/fonts",
        "@pinia/nuxt",
    ],
    devServer: {
        port: 8000,
    },
});
