import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Likes from '../../shared/Likes/Likes';
import classes from './ArticlePage.module.scss';
import Tags from '../../shared/Tags/Tags';
import Form from './components/Form/Form';
import articleApi from '../../services/articleService';
import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/reducers/authSlice';

function ArticlePage() {
	// const { isLoading, data, slug } = useArticle();
	const { token } = useAppSelector(authSelector);
	const { slug } = useParams();
	const { data, isLoading } = articleApi.useGetArticleQuery({
		slug: slug || '',
		token: token || '',
	});

	return (
		<div className={classes.body}>
			<Header />
			<div className={classes.main}>
				{isLoading && <div>Loading...</div>}
				{data && (
					<div className={classes.container}>
						<div className={classes.header}>
							<div className={classes.left}>
								<div className={classes.top}>
									<div className={classes.title}>
										{data.article.title.slice(0, 50)}
									</div>
									<Likes
										slug={slug || ''}
										favorited={data.article.favorited}
										favoritesCount={data.article.favoritesCount}
									/>
								</div>
								<Tags tagList={data.article.tagList} />
							</div>
							<div className={classes.right}>
								<div>
									<div className={classes.name}>
										{data.article.author.username}
									</div>
									<div className={classes.date}>
										{moment(data.article.createdAt).format('LL')}
									</div>
								</div>
								<img
									className={classes.img}
									src={data.article.author.image}
									alt=""
								/>
							</div>
						</div>
						<div className={classes.bot}>
							<div className={classes.text}>{data.article.description}</div>
							<Form data={data} slug={slug || ''} />
						</div>
						<ReactMarkdown className={classes.body}>
							{data.article.body}
						</ReactMarkdown>
					</div>
				)}
			</div>
		</div>
	);
}

export default ArticlePage;
