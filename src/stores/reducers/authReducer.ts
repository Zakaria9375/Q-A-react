import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBUser } from "../../types/types";

export interface MyAuthState {
	isAuthenticated: boolean;
	user: DBUser | null;
	token: string | null;
}

const initialState: MyAuthState = {
	isAuthenticated: JSON.parse(
		localStorage.getItem("isAuthenticated") || "false"
	),
	user: JSON.parse(localStorage.getItem("user") || "null"),
	token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ user: DBUser; token: string }>) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			localStorage.setItem(
				"isAuthenticated",
				JSON.stringify(state.isAuthenticated)
			);
			localStorage.setItem("user", JSON.stringify(state.user));
			localStorage.setItem("token", state.token);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
