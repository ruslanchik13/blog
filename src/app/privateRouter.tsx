import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

function PrivateRouter() {
	const { token } = useAppSelector((state) => state.auth);
	return token ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRouter;
