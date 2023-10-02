import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import articleApi from '../services/articleService';
import { useAppSelector } from './redux';
import { IText } from '../types/IText';

interface FormData {
	title: string;
	description: string;
	body: string;
}

const useEdit = () => {
	const { slug } = useParams();
	const { data } = articleApi.useGetArticleQuery(slug || '');
	const [text, setText] = useState({
		title: data ? data.article.title : '',
		description: data ? data.article.description : '',
		body: data ? data.article.body : '',
	});
	const [tags, setTags] = useState<string[]>(data ? data.article.tagList : []);
	const [updateArticle, { isError, isSuccess }] =
		articleApi.useUpdateArticleMutation();
	const { token } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onChange' });

	useEffect(() => {
		if (isSuccess) {
			alert('Вы успешно изменили статью');
			navigate('/');
		}
	}, [isError, isSuccess]);

	const deleteHandler = (index: number) => {
		const arr = tags.filter((item, indexItem) => index !== indexItem);
		setTags(arr);
	};

	const addTag = () => setTags([...tags, '']);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const arr = tags.map((itemArr, itemIndex) => {
			if (index === itemIndex) return e.target.value;
			return itemArr;
		});
		setTags(arr);
	};
	const onSubmit = async ({ body, title, description }: IText) => {
		await updateArticle({
			slug: slug || '',
			token: token || '',
			body,
			title,
			description,
			tags,
		});
	};

	return {
		text,
		setText,
		register,
		handleSubmit,
		errors,
		deleteHandler,
		addTag,
		changeHandler,
		onSubmit,
		tags,
	};
};

export default useEdit;
