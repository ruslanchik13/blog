import { IAuthor } from './author';

export interface IArticle {
	slug?: string;
	title: string;
	description: string;
	body?: string;
	tagList: string[];
	createdAt: string;
	updatedAt?: string;
	favorited?: boolean;
	favoritesCount: number;
	author: IAuthor;
}