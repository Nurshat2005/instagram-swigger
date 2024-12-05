import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
    signIn: build.mutation<AUTH.SignInResponse, AUTH.SignInRequest>({
      query: (newSigin) => ({
        url: '/api/v1/auth/sign-in',
        method: 'POST',
        body: newSigin,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('tokens', JSON.stringify(data));
        } catch (error) {
          console.error('Ошибка при входе:', error);
        }
      },
      invalidatesTags: ['auth'],
    }),
    signUp: build.mutation<AUTH.SignUpResponse, AUTH.SignUpRequest>({
      query: (newSignUp) => ({
        url: '/api/v1/auth/sign-up',
        method: 'POST',
        body: newSignUp,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('tokens', JSON.stringify(data));
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
        }
      },
      invalidatesTags: ['auth'],
    }),
  }),
});

export const { useGetMeQuery, useSignInMutation, useSignUpMutation } = api;
