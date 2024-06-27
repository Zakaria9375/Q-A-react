import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { login, logout } from "../stores/reducers/authReducer";

const useAuth = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		const authenticate = async () => {
			if (isAuthenticated && user) {
				const token = await getAccessTokenSilently();
				dispatch(login({ user, token }));
			} else {
				dispatch(logout());
			}
		};

		authenticate();
	}, [isAuthenticated, user, getAccessTokenSilently, dispatch]);

	return { isAuthenticated, user };
};

export default useAuth;
