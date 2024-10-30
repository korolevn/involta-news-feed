// эндпоинт для запросов к api

export default defineEventHandler(async (event) => {
    const { search } = getQuery(event);
    const news = await $fetch(`http://localhost:3000?search=${search}`);

    return news;
});
