import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/* ----- Cripto News Api Headers ----- */
const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '9adeea4700msh23f9ab30020a7dfp11cb26jsnf46dc5183aec'
}

/* ----- News Api base URL ----- */
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

/* create Request function */
const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

/* ----- Create Api Function ----- */
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',   // Reducer name
    baseQuery: fetchBaseQuery({ baseUrl }),     // BaseQuery(url) fetch function
    endpoints:(builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;    // export newa api As Redux hook