import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IFormData } from '../types/formData';
import { useAppDispatch } from './redux';
import articleApi from '../services/articleService';
import { setUser } from '../store/reducers/authSlice';

const useAuth = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({ mode: 'onChange' });
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [authUser, { data, isSuccess }] = articleApi.useAuthUserMutation();

	useEffect(() => {
		if (data && isSuccess) {
			dispatch(
				setUser({
					username: data.user.username,
					token: data.user.token,
					email: data.user.email,
					image: data.user.image,
				})
			);
			navigate('/');
		}
	}, [data, dispatch, isSuccess, navigate]);

	const onSubmit = async ({ password, email }: IFormData) => {
		await authUser({ user: { email, password } });
	};

	return { register, handleSubmit, errors, onSubmit };
};

export default useAuth;
