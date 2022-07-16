import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* ----- Cripto API Headers ----- */
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '9adeea4700msh23f9ab30020a7dfp11cb26jsnf46dc5183aec',
}

/* ----- Cripto API base URL ----- */
const baseUrl = 'https://coinranking1.p.rapidapi.com';

/* Request create function */
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

/* ----- Create API Function ----- */
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',       // Reducer name
    baseQuery: fetchBaseQuery({ baseUrl }),     // BaseQuery(URL) fetch function 
    endpoints: (builder) => ({
        /* ---------- Crypto endpoint ---------- */
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        /* ---------- Selected Crypto currency Details endpoint ----------- */
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        /* ---------- Selected crypto currency History endpoint ---------- */
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`)
        }),
        /*===== Note: To access this endpoint you need premium plan ===== */
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    }),

});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi;      // export cryptoAPI as a Redux_hook  

