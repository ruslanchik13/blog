import { Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import classes from './RegisterForm.module.scss';
import Input from '../../shared/Input/Input';
import useRegister from '../../hooks/useRegister';

function RegisterForm() {
	const {
		handleSubmit,
		onSubmit,
		register,
		check,
		errors,
		onChange,
		passwordWatch,
	} = useRegister();
	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Create new account</div>
				<div className={classes.form}>
					<Input
						{...register('username', {
							required: 'Обязательное поле!',
							maxLength: {
								value: 20,
								message: '20 будет достаточно ;)',
							},
						})}
						placeholder="Username"
						title="Username"
						error={errors.username && errors.username.message}
					/>
					<Input
						{...register('email', {
							required: 'Обязательное поле!',
							pattern: {
								value: /^[a-z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
					<Input
						type="password"
						{...register('subPass', {
							required: 'Обязательное поле!',
							validate: (value) =>
								value === passwordWatch || 'Passwords must match',
						})}
						placeholder="Repeat Password"
						title="Repeat Password"
						error={errors.subPass && errors.subPass.message}
					/>
				</div>
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
