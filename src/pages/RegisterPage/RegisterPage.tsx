import Header from '../../components/Header/Header';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import classes from './RegisterPage.module.scss';

function RegisterPage() {
	return (
		<div className={classes.main}>
			<Header />
			<RegisterForm />
		</div>
	);
}

export default RegisterPage;
