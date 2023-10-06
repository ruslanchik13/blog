import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './ProfileForm.module.scss';
import Inputs from './components/Inputs/Inputs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authSelector, setUser } from '../../store/reducers/authSlice';
import articleApi from '../../services/articleService';
import { IAuth } from '../../types/IAuth';

function ProfileForm() {
	const { token, email, username, image } = useAppSelector(authSelector);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [updateUser, { isError, isSuccess }] =
		articleApi.useUpdateUserMutation();
	const [text, setText] = useState<IAuth>({
		username: username || '',
		email: email || '',
		url: image || '',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuth>({ mode: 'onChange' });

	const onSubmit = async ({ password, url, username, email }: IAuth) => {
		if (password && token)
			await updateUser({
				user: { username: username || '', email, password, image: url || '' },
				token,
			});
		if (!password && token)
			await updateUser({
				user: { username: username || '', email, image: url || '' },
				token,
			});
	};

	useEffect(() => {
		if (isSuccess) {
			alert('Изменения прошли успешно');
			localStorage.clear();
			dispatch(
				setUser({
					token,
					email: text.email,
					username: text.username,
					image: text.url,
				})
			);
			navigate('/');
		}
		if (isError)
			alert(
				'Красивое красное сообщение было бы круче, но такой юзер или мейл уже существуют'
			);
	}, [isSuccess, isError]);

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Edit Profile</div>
				<Inputs
					register={register}
					errors={errors}
					text={text}
					setText={setText}
				/>
				<Button type="primary" className={classes.button}>
					<input className={classes.submit} type="submit" value="Save" />
				</Button>
			</div>
		</form>
	);
}

export default ProfileForm;
