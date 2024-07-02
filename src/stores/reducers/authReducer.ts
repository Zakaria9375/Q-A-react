import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBUser } from "../../types/types";

export interface MyAuthState {
	isAuthenticated: boolean;
	user: DBUser | null;
}

const initialState: MyAuthState = {
	isAuthenticated: JSON.parse(
		localStorage.getItem("isAuthenticated") || "false"
	),
	user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ user: DBUser }>) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			localStorage.setItem(
				"isAuthenticated",
				JSON.stringify(state.isAuthenticated)
			);
			localStorage.setItem("user", JSON.stringify(state.user));
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("user");
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
