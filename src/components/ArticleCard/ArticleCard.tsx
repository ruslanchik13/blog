import moment from 'moment';
import { Link } from 'react-router-dom';
import React from 'react';
import classes from './ArticleCard.module.scss';
import { IArticle } from '../../types/article';
import img from '../../assets/favourite.svg';
import articleApi from '../../services/articleService';
import { useAppSelector } from '../../hooks/redux';

function ArticleCard({
	title,
	tagList,
	description,
	favoritesCount,
	createdAt,
	author,
	slug,
}: IArticle) {
	const [favourArticle] = articleApi.useFavourArticleMutation();
	const { token } = useAppSelector((state) => state.auth);
	const favouriteHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (slug && token) favourArticle({ slug, token });
	};

	return (
		<Link to={`/articles/${slug}`}>
			<div className={classes.main}>
				<div className={classes.container}>
					<div className={classes.header}>
						<div className={classes.left}>
							<div className={classes.top}>
								<div className={classes.title}>{title.slice(0, 50)}</div>
								<div className={classes.likes}>
									<button type="button" onKeyDown={(e) => favouriteHandler(e)}>
										<img src={img} alt="item" />
									</button>
									{favoritesCount}
								</div>
							</div>
							<div className={classes.tags}>
								{tagList &&
									tagList.map(
										(item, index) =>
											index < 5 && (
												<div key={Math.random()} className={classes.tag}>
													{item}
												</div>
											)
									)}
							</div>
						</div>
						<div className={classes.right}>
							<div>
								<div className={classes.name}>{author.username}</div>
								<div className={classes.date}>
									{moment(createdAt).format('LL')}
								</div>
							</div>
							<img className={classes.img} src={author.image} alt="" />
						</div>
					</div>
					<div className={classes.text}>{description.slice(0, 300)}...</div>
				</div>
			</div>
		</Link>
	);
}

export default ArticleCard;
