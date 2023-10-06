import moment from 'moment';
import { Link } from 'react-router-dom';
import classes from './ArticleCard.module.scss';
import { IArticle } from '../../types/IArticle';
import Likes from '../../shared/Likes/Likes';
import Tags from '../../shared/Tags/Tags';

function ArticleCard({
	title,
	tagList,
	description,
	favoritesCount,
	createdAt,
	author,
	slug,
	favorited,
}: IArticle) {
	return (
		<Link to={`/articles/${slug}`}>
			<div className={classes.main}>
				<div className={classes.container}>
					<div className={classes.header}>
						<div className={classes.left}>
							<div className={classes.top}>
								<div className={classes.title}>{title.slice(0, 50)}</div>
								<Likes
									slug={slug}
									favorited={favorited}
									favoritesCount={favoritesCount}
								/>
							</div>
							<Tags tagList={tagList} />
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
