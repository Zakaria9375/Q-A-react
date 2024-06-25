import { Outlet } from "react-router-dom";
import AppHeader from "./components/base/AppHeader";

function App() {
	return (
		<div className="p-6 md:p-8 min-h-dvh">
			<div className="mx-auto max-w-[1110px]">
				<AppHeader />
				<main className="mt-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default App;
