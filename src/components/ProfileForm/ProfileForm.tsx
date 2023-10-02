import { Button } from 'antd';
import classes from './ProfileForm.module.scss';
import Input from '../../shared/Input/Input';
import useProfile from '../../hooks/useProfile';

function ProfileForm() {
	const { handleSubmit, onSubmit, register, errors, setText, urlRegex, text } =
		useProfile();

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Edit Profile</div>
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
				<Button type="primary" className={classes.button}>
					<input className={classes.submit} type="submit" value="Save" />
				</Button>
			</div>
		</form>
	);
}

export default ProfileForm;
