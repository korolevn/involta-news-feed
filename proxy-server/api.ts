// простой сервер на h3 для запросов к rss

import {
    createApp,
    createRouter,
    handleCors,
    getQuery,
    defineEventHandler,
} from "h3";
import type { INewsItem } from "~/types/common";
const Parser = require("rss-parser");

interface ISourceHostnames {
    [key: string]: string;
}

interface IQuery {
    query: {
        search: string;
        source: string;
        page: number;
    };
}

const MOS_FEED_HOSTNAME = "https://www.mos.ru";
const RAM_FEED_HOSTNAME = "https://news.rambler.ru";

const FEED_LIST = [
    `${MOS_FEED_HOSTNAME}/rss/`,
    `${RAM_FEED_HOSTNAME}/rss/world/`,
];

const SOURCE_HOSTNAMES: ISourceHostnames = {
    mos: MOS_FEED_HOSTNAME,
    ram: RAM_FEED_HOSTNAME,
};

const NEWS_PER_PAGE = 4;

export const app = createApp();

const router = createRouter();
const parser = new Parser();

const feedRequests = FEED_LIST.map((feed) => {
    return parser.parseURL(feed);
});

// перемешивает массив, чтобы на странице были материалы с разных rss - лент
const shuffle = (arr: INewsItem[]) => {
    return arr.sort(() => Math.random() - 0.5);
};

const data = Promise.all(feedRequests)
    .then((res) => {
        const newsArray = res.map((newsFeed) => newsFeed.items).flat();
        return shuffle(newsArray);
    })
    .catch((error) => {
        throw createError({
            status: 400,
            statusMessage: "Bad Request",
            message: "Неверный запрос",
        });
    });

router.get(
    "/",
    defineEventHandler<IQuery>(async (event) => {
        const { search, source, page } = getQuery(event);

        let newsArray: INewsItem[] = await data;
        console.log(newsArray);

        if (search) {
            console.log("from search");
            console.log(search);
            const queryParamWords = search.toLowerCase().split(" ");

            const findQueryParamsWords = (
                newsItemContent: string | undefined,
                queryWord: string,
            ) => {
                if (!newsItemContent) return;
                return newsItemContent
                    .toLowerCase()
                    .includes(queryWord.toLowerCase());
            };

            const filteredWithSearchQuery = newsArray.filter(
                (newsItem: INewsItem) =>
                    queryParamWords.some(
                        (word) =>
                            findQueryParamsWords(newsItem.title, word) ||
                            findQueryParamsWords(newsItem?.content, word),
                    ),
            );

            newsArray = filteredWithSearchQuery;
        }

        if (source) {
            const filterWithSource = (link: string, source: string) => {
                return new URL(link).origin === source;
            };
            const filteredWithSource = newsArray.filter((newsItem: INewsItem) =>
                filterWithSource(newsItem.link, SOURCE_HOSTNAMES[source]),
            );

            newsArray = filteredWithSource;
        }

        const countPages = (newsArray: INewsItem[]) => {
            return Math.ceil((newsArray.length || 0) / NEWS_PER_PAGE);
        };
        const pagesTotal = countPages(newsArray);

        const currentPage = !(page > pagesTotal || page < 1) ? page : 1;
        const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
        const endIndex = currentPage * NEWS_PER_PAGE;

        newsArray = newsArray.slice(startIndex, endIndex);

        const result = {
            news: newsArray,
            pagesTotal,
        };

        return result;
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
