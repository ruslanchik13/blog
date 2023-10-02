import Header from '../../components/Header/Header';
import AuthForm from '../../components/AuthForm/AuthForm';
import classes from './AuthPage.module.scss';

function AuthPage() {
	return (
		<div className={classes.main}>
			<Header />
			<AuthForm />
		</div>
	);
}

export default AuthPage;
