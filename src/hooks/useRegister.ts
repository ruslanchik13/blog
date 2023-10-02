import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import articleApi from '../services/articleService';
import { useAppDispatch } from './redux';
import { setUser } from '../store/reducers/authSlice';

interface FormData {
	email: string;
	username: string;
	password: string;
	subPass: string;
}

const useRegister = () => {
	const [check, setCheck] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>({ mode: 'onChange' });
	const [regUser, { data, isSuccess }] = articleApi.useRegUserMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const passwordWatch = watch('password');
	const onChange = (e: CheckboxChangeEvent) => {
		setCheck(e.target.checked);
	};
	const onSubmit = async ({ password, email, username }: FormData) => {
		await regUser({ password, email, username });
	};

	useEffect(() => {
		if (data && isSuccess) {
			dispatch(
				setUser({
					token: data.user.token,
					email: data.user.email,
					username: data.user.username,
					image: null,
				})
			);
			navigate('/');
		}
	}, [data, dispatch, isSuccess, navigate]);

	return {
		check,
		register,
		handleSubmit,
		errors,
		passwordWatch,
		onChange,
		onSubmit,
	};
};

export default useRegister;
