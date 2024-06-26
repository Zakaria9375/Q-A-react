import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";

interface DateProps {
	theDate: string;
}
dayjs.extend(localizedDate);
dayjs.extend(relativeTime);

function BaseDate(props: DateProps) {
	const date = dayjs(props.theDate).format("LLL");

	return (
		<>
			<span className="text-gray-400 m-2 leading-none">{date}</span>
		</>
	);
}
export default BaseDate;
