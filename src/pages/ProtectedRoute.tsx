import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../stores/store";
interface ProtectedRouteProps {
	children: React.ReactElement;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default ProtectedRoute;
