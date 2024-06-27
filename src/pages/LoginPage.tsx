import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

function LoginPage() {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className="min-h-[500px] flex flex-col items-center justify-center">
			<h1 className="heading-top">
				To make a question in our application you have to login. It's simple and
				easy
			</h1>
			<div className="flex items-center justify-center gap-8">
				<NavLink to="/" className="btn bg-green-900 hover:bg-green-700">
					Home
				</NavLink>
				<button onClick={() => loginWithRedirect()} className="btn">
					Login
				</button>
			</div>
		</div>
	);
}
export default LoginPage;
