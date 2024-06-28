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
				const token = await getAccessTokenSilently();
				let user: DBUser;
				try {
					const response = await axios.get(
						`${baseUrl}/users/search/findAllByEmail?email=${user0.email}`
					);
					const userDB = response.data._embedded.users[0];
					user = {
						id: userDB.id,
						name: userDB.name,
						email: userDB.email,
						photo: userDB.photo,
					};
				} catch (error) {
					console.error("Error during Finding user In DB:", error);
					const newUser = {
						name: user0.name,
						email: user0.email,
						photo: user0.picture || null,
					};
					const userPostUrl = `${baseUrl}/users`;
					await axios.post(userPostUrl, newUser);
					const response = await axios.get(
						`${baseUrl}/users/search/findAllByEmail?email=${user0.email}`
					);
					user = response.data._embedded.users[0];
				}
				dispatch(login({ user, token }));
			} else {
				dispatch(logout());
			}
		};

		authenticate();
	}, [isAuthenticated, user0, getAccessTokenSilently, dispatch]);

	return { isAuthenticated, user0 };
};

export default useAuth;
