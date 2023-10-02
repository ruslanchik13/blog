import Header from '../../components/Header/Header';
import CreateForm from '../../components/CreateForm/CreateForm';
import classes from './CreatePage.module.scss';

function CreatePage() {
	return (
		<div className={classes.main}>
			<Header />
			<CreateForm />
		</div>
	);
}

export default CreatePage;
