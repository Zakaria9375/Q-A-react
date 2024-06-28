import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import QuestionPage from "./pages/QuestionPage.tsx";
import Layout from "./Layout.tsx";
import AddQuestion from "./pages/AddQuestionPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/add-question",
				element: (
					<ProtectedRoute>
						<AddQuestion />
					</ProtectedRoute>
				),
			},
			{
				path: "/question/:id",
				element: <QuestionPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
