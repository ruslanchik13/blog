import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import articleApi from '../services/articleService';
import { useAppSelector } from './redux';
import { IText } from '../types/IText';

interface FormData {
	title: string;
	description: string;
	body: string;
}

const useCreate = () => {
	const [tags, setTags] = useState<{ tag: string; id: number }[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onChange' });
	const [addArticle] = articleApi.useAddArticleMutation();
	const { token } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const addTag = () => {
		setTags([...tags, { tag: '', id: Math.random() }]);
	};

	const deleteHandler = (index: number) => {
		const arr = tags.filter((item, indexItem) => index !== indexItem);
		setTags(arr);
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const arr = tags.map((itemArr, itemIndex) => {
			if (index === itemIndex) return { tag: e.target.value, id: itemArr.id };
			return itemArr;
		});
		setTags(arr);
	};
	const onSubmit = async ({ body, title, description }: IText) => {
		const arr = tags.map((item) => item.tag);
		await addArticle({
			title,
			body,
			description,
			tags: arr,
			token: token || '',
		});
		navigate('/');
	};

	return {
		register,
		handleSubmit,
		errors,
		addTag,
		deleteHandler,
		changeHandler,
		onSubmit,
		tags,
	};
};

export default useCreate;
