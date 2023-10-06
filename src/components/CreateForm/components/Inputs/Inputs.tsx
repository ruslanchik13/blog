import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '../../../../shared/Input/Input';
import { ICard } from '../../../../types/ICard';
import classes from './Inputs.module.scss';

interface IInputs {
	register: UseFormRegister<ICard>;
	errors: FieldErrors<ICard>;
}

function Inputs({ register, errors }: IInputs) {
	return (
		<>
			<Input
				{...register('title', {
					required: 'Обязательное поле!',
				})}
				placeholder="Title"
				title="Title"
				error={errors.title && errors.title.message}
			/>
			<Input
				{...register('description', {
					required: 'Обязательное поле!',
				})}
				placeholder="Title"
				title="Short description"
				error={errors.description && errors.description.message}
			/>
			<div>
				<div className={classes.text}>Text</div>
				<textarea
					{...register('body', {
						required: 'Обязательное поле!',
					})}
					className={classes.textarea}
					rows={5}
					placeholder="Text"
				/>
				{errors.body && (
					<div className={classes.error}>{errors.body.message}</div>
				)}
			</div>
		</>
	);
}

export default Inputs;
