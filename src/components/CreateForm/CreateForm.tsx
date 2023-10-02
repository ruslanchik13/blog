import { Button } from 'antd';
import classes from './CreateForm.module.scss';
import Input from '../../shared/Input/Input';
import useCreate from '../../hooks/useCreate';

function CreateForm() {
	const {
		addTag,
		errors,
		handleSubmit,
		onSubmit,
		register,
		deleteHandler,
		changeHandler,
		tags,
	} = useCreate();

	return (
		<form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.container}>
				<div className={classes.title}>Create new article</div>
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
				<div>
					<div className={classes.text}>Tags</div>
					<div className={classes.items}>
						{tags.map((item, index) => (
							<div className={classes.tag} key={item.id}>
								<Input
									value={item.tag}
									placeholder="Tag"
									onChange={(e) => changeHandler(e, index)}
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

export default CreateForm;
