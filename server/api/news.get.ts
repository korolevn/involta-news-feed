// эндпоинт для запросов к api

import useBuildUrl from "~/composables/useBuildUrl";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const URL = "http://localhost:3000/";

    const request = useBuildUrl(URL, query);

    try {
        const news = await $fetch(request);
        return news;
    } catch {
        throw createError({
            statusCode: 500,
            message: "Невозможно получить данные",
        });
    }
});
