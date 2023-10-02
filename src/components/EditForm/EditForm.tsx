import { Button } from 'antd';
import { ChangeEvent } from 'react';
import classes from './EditForm.module.scss';
import Input from '../../shared/Input/Input';
import useEdit from '../../hooks/useEdit';

function EditForm() {
	const {
		errors,
		setText,
		text,
		addTag,
		handleSubmit,
		onSubmit,
		register,
		deleteHandler,
		changeHandler,
		tags,
	} = useEdit();
	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Edit article</div>
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
				<div>
					<div className={classes.text}>Tags</div>
					<div className={classes.items}>
						{tags.map((item, index) => (
							<div className={classes.tag} key={Math.random()}>
								<Input
									value={item}
									placeholder="Tag"
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										changeHandler(e, index)
									}
								/>
								<Button
									onClick={() => deleteHandler(index)}
									className={classes.btn}
									danger
								>
									Delete
								</Button>
								{tags.length - 1 === index && (
									<Button className={classes.btn} onClick={() => addTag()}>
										Add tag
									</Button>
								)}
							</div>
						))}
						{tags.length === 0 && (
							<Button className={classes.btn} onClick={() => addTag()}>
								Add tag
							</Button>
						)}
					</div>
				</div>
				<Button className={classes.bottom} type="primary">
					<input className={classes.submit} type="submit" value="Send" />
				</Button>
			</div>
		</form>
	);
}

export default EditForm;
