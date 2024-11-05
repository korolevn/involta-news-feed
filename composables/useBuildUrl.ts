export default <T>(origin: string, query: T) => {
    let queryParamsArray = [];
    for (const property in query) {
        if (!query[property]) continue;

        queryParamsArray.push(`${property}=${query[property]}`);
    }

    const href = queryParamsArray.join("&");
    const url = `${origin}?${href}`;

    return url;
};
