import { Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import classes from './RegisterForm.module.scss';
import Inputs from './components/Inputs/Inputs';
import articleApi from '../../services/articleService';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from '../../store/reducers/authSlice';

export interface FormData {
	email: string;
	username: string;
	password: string;
	subPass: string;
}

function RegisterForm() {
	const [check, setCheck] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>({ mode: 'onChange' });

	const [regUser, { data, isSuccess, error }] = articleApi.useRegUserMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Create new account</div>
				<Inputs
					register={register}
					errors={errors}
					error={error}
					watch={watch}
				/>
				<Checkbox className={classes.check} onChange={onChange}>
					I agree to the processing of my personal information
				</Checkbox>
				<div className={classes.bottom}>
					<Button disabled={!check} className={classes.btn} type="primary">
						<input className={classes.btn} type="submit" value="Create" />
					</Button>
					<div className={classes.text}>
						Already have an account?
						<Link className={classes.link} to="/sign-in">
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</form>
	);
}

export default RegisterForm;
