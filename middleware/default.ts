export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.query.page) {
        return navigateTo("/?page=1");
    }
});
