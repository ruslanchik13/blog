import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/authSlice';

function Header() {
	const { username, image } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const logoutHandler = () => {
		dispatch(logout());
		navigate('/sign-in');
	};
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
				<div className={classes.buttons}>
					{Boolean(username) && (
						<>
							<Button>
								<Link to="/new-article">Create Article</Link>
							</Button>
							<Link className={classes.content} to="/edit-profile">
								<div>{username}</div>
								<img
									className={classes.imgg}
									src={
										image ||
										'https://pic.rutubelist.ru/video/aa/cf/aacfcd5749de8d2dc31b394458ef801d.jpg'
									}
									alt=""
								/>
							</Link>

							<div>
								<Button onClick={() => logoutHandler()}>Log Out</Button>
							</div>
						</>
					)}
					{!username && (
						<>
							<Button>
								<Link to="/sign-in">Sign In</Link>
							</Button>
							<Button>
								<Link to="/sign-up">Sign Up</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
