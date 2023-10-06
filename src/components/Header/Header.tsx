import { Link } from 'react-router-dom';
import classes from './Header.module.scss';
import Auth from './components/Auth';

function Header() {
	return (
		<div className={classes.main}>
			<div className={classes.container}>
				<div className={classes.logo}>
					<Link to="/">
						<img
							className={classes.img}
							src="https://ru-static.z-dn.net/files/d32/6ac376a7a637123b4ed801a79944d4e5.jpg"
							alt=""
						/>
					</Link>
				</div>
				<Auth />
			</div>
		</div>
	);
}

export default Header;
