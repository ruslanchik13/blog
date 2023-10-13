import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './EditForm.module.scss';
import TagsList from './components/TagsList/TagsList';
import Inputs from './components/Inputs/Inputs';
import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/reducers/authSlice';
import articleApi from '../../services/articleService';
import { ICard } from '../../types/ICard';
import { IText } from '../../types/IText';

function EditForm() {
	const [loading, setLoading] = useState(false);
	const { slug } = useParams();
	const navigate = useNavigate();
	const { token } = useAppSelector(authSelector);
	const { data } = articleApi.useGetArticleQuery({
		slug: slug || '',
		token: token || '',
	});

	const [text, setText] = useState<ICard>({
		title: data ? data.article.title : '',
		description: data ? data.article.description : '',
		body: (data && data.article.body) || '',
	});

	const [tags, setTags] = useState<string[]>(data ? data.article.tagList : []);
	const [updateArticle, { isError, isSuccess }] =
		articleApi.useUpdateArticleMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICard>({ mode: 'onChange' });

	useEffect(() => {
		if (isSuccess) {
			alert('Вы успешно изменили статью');
			navigate(`/articles/${slug}`);
		}
	}, [isError, isSuccess]);

	const deleteHandler = (index: number) => {
		const arr = tags.filter((item, indexItem) => index !== indexItem);
		setTags(arr);
	};

	const addTag = () => setTags([...tags, '']);

	const changeHandler = (value: string, index: number) => {
		const updatedTags = tags.map((itemArr, itemIndex) =>
			index === itemIndex ? value : itemArr
		);
		setTags(updatedTags);
	};

	const onSubmit = async ({ body, title, description }: IText) => {
		setLoading(true);
		await updateArticle({
			slug: slug || '',
			token: token || '',
			body,
			title,
			description,
			tags,
		});
	};

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Edit article</div>
				<Inputs
					register={register}
					errors={errors}
					text={text}
					setText={setText}
				/>
				<TagsList
					tags={tags}
					addTag={addTag}
					changeHandler={changeHandler}
					deleteHandler={deleteHandler}
				/>
				<Button loading={loading} className={classes.bottom} type="primary">
					<input className={classes.submit} type="submit" value="Send" />
				</Button>
			</div>
		</form>
	);
}

export default EditForm;
