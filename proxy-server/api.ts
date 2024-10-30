// простой сервер на h3 для запросов к rss

import {
    createApp,
    createRouter,
    handleCors,
    getQuery,
    defineEventHandler,
} from "h3";
import type { NewsItem } from "~/types/common";
const Parser = require("rss-parser");

export const app = createApp();

const FEED_LIST = [
    "https://www.mos.ru/rss/",
    "https://news.rambler.ru/rss/world/",
];

const router = createRouter();

router.get(
    "/",
    defineEventHandler<{ query: { search: string } }>((event) => {
        let parser = new Parser();

        const feedRequests = FEED_LIST.map((feed) => {
            return parser.parseURL(feed);
        });

        const data = Promise.all(feedRequests)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                throw createError({
                    status: 400,
                    statusMessage: "Bad Request",
                    message: "Неверный запрос",
                });
            });

        const query = getQuery(event);

        const newsArray = data
            .then((res) =>
                res.map((r) => {
                    return r.items.filter(
                        (item: NewsItem) =>
                            item.title
                                .toLowerCase()
                                .includes(query.search.toLowerCase()) ||
                            item.content
                                ?.toLowerCase()
                                .includes(query.search.toLowerCase()),
                    );
                }),
            )
            .then((res) => res.reduce((prev, next) => [...prev, ...next]))
            .then((res) => shuffle(res));

        // перемешивает массив, чтобы на странице были материалы с разных rss - лент
        const shuffle = (arr: NewsItem[]) => {
            return arr.sort(() => Math.random() - 0.5);
        };

        return newsArray;
    }),
);

app.use(
    defineEventHandler(async (event) => {
        const didHandleCors = handleCors(event, {
            origin: "*",
        });
        if (didHandleCors) {
            return;
        }
    }),
).use(router);
