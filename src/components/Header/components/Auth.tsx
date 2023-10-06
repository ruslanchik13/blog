import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Auth.module.scss';
import { authSelector, logout } from '../../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function Auth() {
	const { username, image } = useAppSelector(authSelector);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const logoutHandler = () => {
		dispatch(logout());
		navigate('/sign-in');
	};

	return (
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
	);
}

export default Auth;
