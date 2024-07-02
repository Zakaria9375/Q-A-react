import { useAuth0 } from "@auth0/auth0-react";
import { login, logout } from "../stores/reducers/authReducer";
import axios from "axios";
import { baseUrl, DBUser } from "../types/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAppAuth = () => {
	const { user: authUser, isAuthenticated } = useAuth0();
	const dispatch = useDispatch();
	useEffect(() => {
		const authenticate = async () => {
			if (isAuthenticated && authUser) {
				let user: DBUser;
				try {
					const response = await axios.get(
						`${baseUrl}/users/search/findByEmail?email=${authUser.email}`
					);
					user = response.data;
				} catch (error) {
					console.log("User does not exist in database", error);
					const newUser = {
						name: authUser.name,
						email: authUser.email,
						photo: authUser.picture || null,
					};
					const response = await axios.post(`${baseUrl}/users`, newUser);
					user = response.data;
				}
				dispatch(login({ user }));
			} else {
				dispatch(logout());
			}
		};
		authenticate();
	}, [isAuthenticated, authUser, dispatch]);

	return { isAuthenticated, authUser };
};

export default useAppAuth;
