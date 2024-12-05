import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Настройка базового запроса
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_AUTH}`,
  prepareHeaders: (headers) => {
    const tokens = localStorage.getItem('tokens');

    if (tokens) {
      try {
        const parsedTokens = JSON.parse(tokens);
        if (parsedTokens.accessToken) {
          headers.set('Authorization', `Bearer ${parsedTokens.accessToken}`);
          console.log('Authorization header set:', headers.get('Authorization'));
        }
      } catch (error) {
        console.error('Ошибка при парсинге токенов:', error);
      }
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.error('Ошибка запроса:', result.error);
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ['auth', 'post-like'],
  endpoints: () => ({}),
});
