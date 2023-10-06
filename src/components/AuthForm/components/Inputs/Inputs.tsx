import { FieldErrors, UseFormRegister } from 'react-hook-form';
import classes from './Inputs.module.scss';
import Input from '../../../../shared/Input/Input';
import { IFormData } from '../../../../types/IFormData';

interface IInputs {
	register: UseFormRegister<IFormData>;
	errors: FieldErrors<IFormData>;
}

function Inputs({ register, errors }: IInputs) {
	return (
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
	);
}

export default Inputs;
