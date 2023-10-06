import React from 'react';
import articleApi from '../../services/articleService';
import { useAppSelector } from '../../hooks/redux';
import img from '../../assets/favourite.svg';
import classes from './Likes.module.scss';

interface LikesProps {
	slug: string;
	favorited: boolean;
	favoritesCount: number;
}

function Likes({ slug, favorited, favoritesCount }: LikesProps) {
	const [favourArticle] = articleApi.useFavourArticleMutation();
	const [unfavourArticle] = articleApi.useUnFavourArticleMutation();
	const { token } = useAppSelector((state) => state.auth);

	const favouriteHandler = (e: React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		if (slug && token && !favorited) favourArticle({ slug, token });
		if (slug && token && favorited) unfavourArticle({ slug, token });
	};
	return (
		<div className={classes.likes}>
			<img
				onClick={(e) => favouriteHandler(e)}
				style={{ backgroundColor: favorited ? 'red' : '' }}
				src={img}
				alt="item"
			/>
			{favoritesCount}
		</div>
	);
}

export default Likes;
