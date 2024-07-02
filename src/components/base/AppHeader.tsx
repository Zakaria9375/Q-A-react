import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import useAppAuth from "../../hooks/useAppAuth";

function AppHeader() {
	useAppAuth();
	const { loginWithRedirect, logout, isLoading } = useAuth0();
	const logoutWithRedirect = () =>
		logout({
			logoutParams: {
				returnTo: `${window.location.origin}/redirect`,
			},
		});
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	return (
		<header className="flex justify-between items-center gap-4 flex-col md:flex-row">
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
				{!isLoading ? (
					isAuthenticated ? (
						<div className="flex gap-3 items-center">
							<div className="flex gap-2 items-center">
								<img
									src={user?.photo || "/public/user.png"}
									alt="Profile photo"
									className="size-8 rounded-full"
								/>
								<span className="text-base tracking-tight">
									{user?.name || "Welcome"}
								</span>
							</div>
							<button onClick={() => logoutWithRedirect()} className="log-btn">
								Log out
							</button>
						</div>
					) : (
						<button
							onClick={() =>
								loginWithRedirect({
									authorizationParams: {
										redirect_uri: `${window.location.origin}/redirect`,
									},
								})
							}
							className="log-btn"
						>
							Log in
						</button>
					)
				) : (
					<div className="name-spin"></div>
				)}
			</div>
		</header>
	);
}
export default AppHeader;
