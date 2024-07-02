import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./authConfig.ts";
import { Provider } from "react-redux";
import { store } from "./stores/store.ts";
const { domain, clientId } = getConfig();
function onRedirect() {
	window.history.replaceState(
		{},
		document.title,
		window.location.origin + "/redirect"
	);
}
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			onRedirectCallback={onRedirect}
		>
			<Provider store={store}>
				<App />
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);
