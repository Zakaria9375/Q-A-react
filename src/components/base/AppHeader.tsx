import { NavLink } from "react-router-dom";

function AppHeader() {
	return (
		<div className="flex justify-between">
			<header>Q & A</header>
			<nav className="flex gap-4">
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Home
				</NavLink>
				<NavLink to="/search">Search</NavLink>
			</nav>
		</div>
	);
}
export default AppHeader;
