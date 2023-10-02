import Header from '../../components/Header/Header';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import classes from './ProfilePage.module.scss';

function ProfilePage() {
	return (
		<div className={classes.main}>
			<Header />
			<ProfileForm />
		</div>
	);
}

export default ProfilePage;
