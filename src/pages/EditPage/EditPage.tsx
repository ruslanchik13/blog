import Header from '../../components/Header/Header';
import classes from './EditPage.module.scss';
import EditForm from '../../components/EditForm/EditForm';

function EditPage() {
	return (
		<div className={classes.main}>
			<Header />
			<EditForm />
		</div>
	);
}

export default EditPage;
