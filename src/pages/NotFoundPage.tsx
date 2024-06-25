import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<>
			<div className="p-4 md:p-6 min-h-dvh">
				<div className="mx-auto max-w-[1200px]">
					<main className="text-center">
						<h1 className="my-8">
							The page that you are looking for does not exit
						</h1>
						<Link to="/" className="btn">
							Go back home
						</Link>
					</main>
				</div>
			</div>
		</>
	);
}

export default NotFoundPage;
