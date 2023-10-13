import { useEffect } from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import articleApi from '../../services/articleService';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useAppSelector } from '../../hooks/redux';
import classes from './ArticleList.module.scss';
import { authSelector } from '../../store/reducers/authSlice';

function ArticleList() {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('offset');

	const { token } = useAppSelector(authSelector);
	const { data, isLoading } = articleApi.useGetArticlesQuery({
		limit: 5,
		offset: Number(page),
		token: token || '',
	});

	useEffect(() => {
		if (!searchParams.get('offset')) {
			setSearchParams({ offset: '0' });
		}
	}, [searchParams, page]);

	return (
		<div className={classes.main}>
			{isLoading && <div className={classes.loading}>Loading...</div>}
			{data &&
				data.articles.map((item) => (
					<ArticleCard
						key={item.slug}
						title={item.title}
						description={item.description}
						tagList={item.tagList}
						createdAt={item.createdAt}
						favoritesCount={item.favoritesCount}
						author={item.author}
						slug={item.slug}
						favorited={item.favorited}
					/>
				))}
			<Pagination
				className={classes.pagination}
				defaultCurrent={1}
				current={Number(page) ? Number(page) / 5 + 1 : 1}
				total={data && data.articlesCount}
				defaultPageSize={5}
				showSizeChanger={false}
				onChange={(page) =>
					page === 1
						? setSearchParams({ offset: '0' })
						: setSearchParams({ offset: ((page - 1) * 5).toString() })
				}
			/>
		</div>
	);
}

export default ArticleList;
