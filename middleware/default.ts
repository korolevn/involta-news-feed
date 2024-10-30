export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/") {
        return navigateTo("/news/all/1");
    }
});
