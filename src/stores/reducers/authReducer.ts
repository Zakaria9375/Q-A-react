import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBUser } from "../../types/types";

export interface MyAuthState {
	isAuthenticated: boolean;
	user: DBUser | null;
	token: string | null;
}

const initialState: MyAuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<{ user: DBUser; token: string }>) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
