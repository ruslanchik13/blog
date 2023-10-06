import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import classes from './Inputs.module.scss';
import Input from '../../../../shared/Input/Input';
import { FormData } from '../../RegisterForm';

interface IInputs {
	register: UseFormRegister<FormData>;
	errors: FieldErrors<FormData>;
	error: FetchBaseQueryError | SerializedError | undefined;
	watch: (pas: string) => string;
}

function Inputs({ register, errors, error, watch }: IInputs) {
	const passwordWatch = watch('password');
	return (
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
				error={
					(errors.username && errors.username.message) ||
					(error && 'data' in error
						? (
								error.data as {
									errors: { username: string; email: string };
								}
						  ).errors.username
						: '')
				}
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
				error={
					(errors.email && errors.email.message) ||
					(error && 'data' in error
						? (
								error.data as {
									errors: { username: string; email: string };
								}
						  ).errors.email
						: '')
				}
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
					validate: (value: string) =>
						value === passwordWatch || 'Passwords must match',
				})}
				placeholder="Repeat Password"
				title="Repeat Password"
				error={errors.subPass && errors.subPass.message}
			/>
		</div>
	);
}

export default Inputs;
