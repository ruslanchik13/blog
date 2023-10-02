import { useState } from 'react';
import { Pagination } from 'antd';
import articleApi from '../../services/articleService';
import ArticleCard from '../ArticleCard/ArticleCard';
import classes from './ArticleList.module.scss';

function ArticleList() {
	const [currOffset, setCurrOffset] = useState(0);
	const { data } = articleApi.useGetArticlesQuery({
		limit: 5,
		offset: currOffset,
	});

	return (
		<div className={classes.main}>
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
					/>
				))}
			<Pagination
				className={classes.pagination}
				defaultCurrent={1}
				current={currOffset ? currOffset / 5 + 1 : 1}
				total={data && data.articlesCount}
				defaultPageSize={5}
				onChange={(page) =>
					page === 1 ? setCurrOffset(0) : setCurrOffset((page - 1) * 5)
				}
				showSizeChanger={false}
			/>
		</div>
	);
}

export default ArticleList;
