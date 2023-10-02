import { Button } from 'antd';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.scss';
import Input from '../../shared/Input/Input';
import useAuth from '../../hooks/useAuth';

function AuthForm() {
	const { register, handleSubmit, errors, onSubmit } = useAuth();

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Sign In</div>
				<div className={classes.form}>
					<Input
						{...register('email', {
							required: 'Обязательное поле!',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
								message: 'Введите корректный Email',
							},
						})}
						placeholder="Email address"
						title="Email address"
						error={errors.email && errors.email.message}
					/>
					<Input
						type="password"
						{...register('password', {
							required: 'Обязательное поле!',
							minLength: {
								value: 6,
								message: 'Your password needs to be at least 6 characters.',
							},
						})}
						placeholder="Password"
						title="Password"
						error={errors.password && errors.password.message}
					/>
				</div>
				<div className={classes.bottom}>
					<Button className={classes.btn} type="primary">
						<input className={classes.btn} type="submit" value="Login" />
					</Button>
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
