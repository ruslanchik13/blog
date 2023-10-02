import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import articleApi from '../services/articleService';
import { useAppDispatch, useAppSelector } from './redux';
import { IFormData } from '../types/formData';
import { setUser } from '../store/reducers/authSlice';

const useProfile = () => {
	const urlRegex =
		// eslint-disable-next-line no-useless-escape
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
	const { token, email, username, image } = useAppSelector(
		(state) => state.auth
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [updateUser, { isError, isSuccess }] =
		articleApi.useUpdateUserMutation();
	const [text, setText] = useState({
		username: username || '',
		email: email || '',
		url: image || '',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({ mode: 'onChange' });

	const onSubmit = async ({ password, url, username, email }: IFormData) => {
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

	return { urlRegex, setText, register, handleSubmit, errors, onSubmit, text };
};

export default useProfile;
