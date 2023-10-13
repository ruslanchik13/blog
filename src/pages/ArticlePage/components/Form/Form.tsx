import { Button, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import classes from './Form.module.scss';
import articleApi from '../../../../services/articleService';

function Form({ slug }: { slug: string }) {
	const navigate = useNavigate();
	const [deleteArticle, { isError, isSuccess }] =
		articleApi.useDeleteArticleMutation();
	const userData = localStorage.getItem('user');

	useEffect(() => {
		if (isSuccess) {
			navigate('/');
			alert('Статья была удалена');
		}
		if (isError) alert('Нельзя удалить чужое');
	}, [isError, isSuccess, navigate]);

	const confirm = async () => {
		if (slug && userData)
			await deleteArticle({ slug, token: JSON.parse(userData).token });
	};

	return (
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
			<Button className={classes.edit}>
				<Link to={`/articles/${slug}/edit`}>Edit</Link>
			</Button>
		</div>
	);
}

export default Form;
