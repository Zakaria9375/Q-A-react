import useFetchData from "../../hooks/useFetchData";
import { baseUrl, DBUser } from "../../types/types";
import DataLoader from "../base/DataLoader";

interface UserDetailProps {
	userId: number | null;
}

function UserDetail(props: UserDetailProps) {
	const userExist: boolean = props.userId !== -1 && props.userId !== null;
	const userUrl = userExist ? `${baseUrl}/users/${props.userId}` : null;
	const { data, isLoading, error } = useFetchData<DBUser>(userUrl);
	return (
		<>
			<DataLoader isLoading={isLoading} error={error} nameSpinner={true}>
				<div className=" flex gap-4 w-fit py-1.5 px-5 mx-6 bg-white rounded-t-md shadow-ninja override-bg">
					<img
						src={data?.photo || "/public/user.png"}
						alt={`${data?.name} User Profile`}
						className="rounded-full size-7"
					/>
					<h2 className="text-lg">{data?.name || "Guest"}</h2>
				</div>
			</DataLoader>
		</>
	);
}

export default UserDetail;
