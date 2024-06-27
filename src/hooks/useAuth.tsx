import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { login, logout } from "../stores/reducers/authReducer";
import axios from "axios";
import { baseUrl, DBUser } from "../types/types";

const useAuth = () => {
	const { user: user0, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		const authenticate = async () => {
			if (isAuthenticated && user0) {
				try {
					const token = await getAccessTokenSilently();
					const response = await axios.get(
						`${baseUrl}/users/search/findByEmail?email=${user0.email}`
					);
					let user: DBUser;
					if (response.data.length > 0) {
						user = response.data[0];
					} else {
						const newUser = {
							name: user0.name,
							email: user0.email,
							photo: user0.picture || null,
						};
						const userPostUrl = `${baseUrl}/users`;
						const createUserResponse = await axios.post(userPostUrl, newUser);
						user = createUserResponse.data;
					}
					dispatch(login({ user, token }));
				} catch (error) {
					console.error("Error during authentication:", error);
					dispatch(logout());
				}
			} else {
				dispatch(logout());
			}
		};

		authenticate();
	}, [isAuthenticated, user0, getAccessTokenSilently, dispatch]);

	return { isAuthenticated, user0 };
};

export default useAuth;
