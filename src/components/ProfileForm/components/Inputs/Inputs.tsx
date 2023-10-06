import Input from '../../../../shared/Input/Input';
import { IAuth } from '../../../../types/IAuth';
import { InputsProps } from '../../../../types/IInputs';
import classes from './Inputs.module.scss';

function Inputs({ register, text, errors, setText }: InputsProps<IAuth>) {
	const urlRegex =
		// eslint-disable-next-line no-useless-escape
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

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
				value={text.username ? text.username : ''}
				onChange={(e) => setText({ ...text, username: e.target.value })}
				title="Username"
				placeholder="Username"
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
				value={text.email ? text.email : ''}
				onChange={(e) => setText({ ...text, email: e.target.value })}
				title="Email address"
				placeholder="Email address"
				error={errors.email && errors.email.message}
			/>
			<Input
				{...register('password', {
					minLength: {
						value: 6,
						message: 'Your password needs to be at least 6 characters.',
					},
				})}
				title="New password"
				placeholder="New password"
				error={errors.password && errors.password.message}
			/>
			<Input
				{...register('url', {
					pattern: {
						value: urlRegex,
						message: 'Введите корректный url',
					},
				})}
				value={text.url ? text.url : ''}
				onChange={(e) => setText({ ...text, url: e.target.value })}
				title="Avatar image (url)"
				placeholder="Avatar image"
				error={errors.url && errors.url.message}
			/>
		</div>
	);
}

export default Inputs;
