import { Button } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classes from './CreateForm.module.scss';
import List from './components/List/List';
import Inputs from './components/Inputs/Inputs';
import { ICard } from '../../types/ICard';
import articleApi from '../../services/articleService';
import { useAppSelector } from '../../hooks/redux';
import { authSelector } from '../../store/reducers/authSlice';
import { IText } from '../../types/IText';

function CreateForm() {
	const [tags, setTags] = useState<{ tag: string; id: number }[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICard>({ mode: 'onChange' });
	const [addArticle] = articleApi.useAddArticleMutation();
	const { token } = useAppSelector(authSelector);
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

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Create new article</div>
				<Inputs register={register} errors={errors} />
				<List
					tags={tags}
					deleteHandler={deleteHandler}
					changeHandler={changeHandler}
					addTag={addTag}
				/>
				<Button className={classes.bottom} type="primary">
					<input className={classes.submit} type="submit" value="Send" />
				</Button>
			</div>
		</form>
	);
}

export default CreateForm;
