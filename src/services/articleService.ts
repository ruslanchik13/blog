import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IArticle } from '../types/article';

interface IArticles {
	articles: IArticle[];
	articlesCount: number;
}

const articleApi = createApi({
	reducerPath: 'filmAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
	tagTypes: ['Post'],
	endpoints: (build) => ({
		getArticles: build.query<IArticles, { limit: number; offset: number }>({
			query: ({ limit, offset }) => ({
				url: '/articles',
				params: {
					limit,
					offset,
				},
			}),
			providesTags: ['Post'],
		}),
		getArticle: build.query<{ article: IArticle }, string>({
			query: (slug) => ({
				url: `/articles/${slug}`,
			}),
			providesTags: ['Post'],
		}),
		deleteArticle: build.mutation<{}, { slug: string; token: string }>({
			query: ({ slug, token }) => ({
				method: 'DELETE',
				url: `/articles/${slug}`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		regUser: build.mutation<
			{
				user: {
					username: string;
					password: string;
					email: string;
					token: string;
				};
			},
			{ username: string; password: string; email: string }
		>({
			query: (user) => ({
				method: 'POST',
				url: '/users',
				body: {
					user,
				},
			}),
		}),
		authUser: build.mutation<
			{
				user: {
					username: string;
					password: string;
					email: string;
					token: string;
					image: string;
				};
			},
			{ user: { password: string; email: string } }
		>({
			query: ({ user }) => ({
				method: 'POST',
				url: '/users/login',
				body: {
					user,
				},
			}),
		}),
		addArticle: build.mutation<
			{},
			{
				title: string;
				body: string;
				description: string;
				token: string;
				tags: string[];
			}
		>({
			query: ({ title, body, description, token, tags }) => ({
				method: 'POST',
				url: `/articles`,
				body: {
					article: {
						body,
						title,
						description,
						tagList: tags,
					},
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		favourArticle: build.mutation<{}, { token: string; slug: string }>({
			query: ({ slug, token }) => ({
				method: 'POST',
				url: `/articles/${slug}/favorite`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		unFavourArticle: build.mutation<{}, { token: string; slug: string }>({
			query: ({ slug, token }) => ({
				method: 'DELETE',
				url: `/articles/${slug}/favorite`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		updateUser: build.mutation<
			IArticles,
			{
				user: {
					password?: string;
					email: string;
					username: string;
					image: string;
				};
				token: string;
			}
		>({
			query: ({ token, user }) => ({
				method: 'PUT',
				url: '/user',
				body: {
					user,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
		}),
		updateArticle: build.mutation<
			{},
			{
				token: string;
				slug: string;
				title: string;
				body: string;
				description: string;
				tags: string[];
			}
		>({
			query: ({ slug, token, title, description, tags, body }) => ({
				method: 'PUT',
				url: `/articles/${slug}`,
				body: {
					article: {
						title,
						description,
						tags,
						body,
					},
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Post'],
		}),
	}),
});

export default articleApi;
