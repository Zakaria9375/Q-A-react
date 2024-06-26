import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
function AppHeader() {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const logoutWithRedirect = () =>
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	return (
		<div className="flex justify-between ">
			<nav className="flex gap-4 justify-center items-center text-lg">
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
							{user?.picture ? (
								<img
									src={user?.picture}
									alt="Profile photo"
									className="size-10"
								/>
							) : (
								<i className="fa-solid fa-user text-[25px]"></i>
							)}

							<span className="capitalize">{user?.name || "user"}</span>
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
		</div>
	);
}
export default AppHeader;
