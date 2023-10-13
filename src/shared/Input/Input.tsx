import { ChangeEvent, forwardRef } from 'react';
import classes from './Input.module.scss';

const Input = forwardRef<
	HTMLInputElement,
	{
		placeholder: string;
		className?: string;
		title?: string;
		error?: string;
		type?: string;
		value?: string;
		onChange?: (i: ChangeEvent<HTMLInputElement>) => void;
	}
>(
	(
		{ placeholder, className, title, value, error, onChange, type, ...rest },
		ref
	) => {
		return (
			<div className={classes.item}>
				<div className={classes.title}>{title && title}</div>
				<input
					onChange={onChange}
					value={value}
					ref={ref}
					type={type}
					placeholder={placeholder}
					className={`${classes.input} ${className} ${
						error && classes.errInput
					}`}
					{...rest}
				/>
				<div className={classes.error}>{error}</div>
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
