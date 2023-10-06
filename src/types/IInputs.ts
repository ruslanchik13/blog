import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputsProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	text: T;
	setText: (t: T) => void;
}
