import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import classes from './ArticlePage.module.scss';
import articleApi from '../../services/articleService';
import Header from '../../components/Header/Header';

function ArticlePage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const [edit, setEdit] = useState(false);
	const { data, isLoading } = articleApi.useGetArticleQuery(slug || '');
	const [deleteArticle, { isError, isSuccess }] =
		articleApi.useDeleteArticleMutation();
	const userData = localStorage.getItem('user');

	const confirm = async () => {
		if (slug && userData)
			await deleteArticle({ slug, token: JSON.parse(userData).token });
	};

	const handleClick = () => {
		if (
			data &&
			userData &&
			data.article.author.username === JSON.parse(userData).username
		) {
			return setEdit(true);
		}
		return alert('Нельзя редактировать чужое!');
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
			alert('Статья была удалена');
		}
		if (isError) alert('Нельзя удалить чужое');
	}, [isError, isSuccess, navigate]);

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
									<div className={classes.likes}>
										{data.article.favoritesCount}
									</div>
								</div>
								<div className={classes.tags}>
									{data.article.tagList &&
										data.article.tagList.map(
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
							<div>
								<Popconfirm
									title="Delete the task"
									description="Are you sure to delete this task?"
									onConfirm={confirm}
									okText="Yes"
									cancelText="No"
								>
									<Button danger>Delete</Button>
								</Popconfirm>
								<Button onClick={() => handleClick()} className={classes.edit}>
									{edit ? (
										<Link to={`/articles/${slug}/edit`}>Edit</Link>
									) : (
										'Edit'
									)}
								</Button>
							</div>
						</div>
						<div className={classes.body}>{data.article.body}</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ArticlePage;
