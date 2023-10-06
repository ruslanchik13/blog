import Input from '../../../../shared/Input/Input';
import classes from '../../EditForm.module.scss';
import { ICard } from '../../../../types/ICard';
import { InputsProps } from '../../../../types/IInputs';

function Inputs({ register, errors, text, setText }: InputsProps<ICard>) {
	return (
		<>
			<Input
				{...register('title', {
					required: 'Обязательное поле!',
				})}
				placeholder="Title"
				title="Title"
				error={errors.title && errors.title.message}
				value={text.title}
				onChange={(e) => setText({ ...text, title: e.target.value })}
			/>
			<Input
				{...register('description', {
					required: 'Обязательное поле!',
				})}
				placeholder="Title"
				title="Short description"
				error={errors.description && errors.description.message}
				value={text.description}
				onChange={(e) => setText({ ...text, description: e.target.value })}
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
					value={text.body}
					onChange={(e) => setText({ ...text, body: e.target.value })}
				/>
				{errors.body && (
					<div className={classes.error}>{errors.body.message}</div>
				)}
			</div>
		</>
	);
}

export default Inputs;
