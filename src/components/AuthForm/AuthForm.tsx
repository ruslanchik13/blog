import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import classes from './AuthForm.module.scss';
import Inputs from './components/Inputs/Inputs';
import { IFormData } from '../../types/IFormData';
import { useAppDispatch } from '../../hooks/redux';
import articleApi from '../../services/articleService';
import { setUser } from '../../store/reducers/authSlice';

function AuthForm() {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({ mode: 'onChange' });
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [authUser, { data, isSuccess, isError }] =
		articleApi.useAuthUserMutation();

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
		} else {
			setLoading(false);
		}
	}, [data, dispatch, isSuccess, isError, navigate]);

	const onSubmit = async ({ password, email }: IFormData) => {
		setLoading(true);
		await authUser({ user: { email, password } });
	};

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Sign In</div>
				<Inputs register={register} errors={errors} />
				<div className={classes.bottom}>
					<Button loading={loading} className={classes.btn} type="primary">
						<input className={classes.btn} type="submit" value="Login" />
					</Button>
					{isError && (
						<div className={classes.error}>Невалид мейл или пароль</div>
					)}
					<div className={classes.text}>
						Don’t have an account?
						<Link className={classes.link} to="/sign-up">
							Sign Up.
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}

export default AuthForm;
