import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

function AppHeader() {
	useAuth();
	const { loginWithRedirect, logout } = useAuth0();
	const logoutWithRedirect = () =>
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	return (
		<header className="flex justify-between ">
			<nav
				className="flex gap-4 justify-center items-center text-lg"
				aria-label="Pages navigation"
			>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Home
				</NavLink>
				<NavLink to="/search">Search</NavLink>
			</nav>
			<div>
				{isAuthenticated ? (
					<div className="flex gap-3 items-center">
						<div className="flex gap-2 items-center">
							<img
								src={user?.photo || "/public/user.png"}
								alt="Profile photo"
								className="size-10"
							/>
							<span className="capitalize">{user?.name || "Welcome"}</span>
						</div>
						<button onClick={() => logoutWithRedirect()} className="log-btn">
							Log out
						</button>
					</div>
				) : (
					<button onClick={() => loginWithRedirect()} className="log-btn">
						Log in
					</button>
				)}
			</div>
		</header>
	);
}
export default AppHeader;
