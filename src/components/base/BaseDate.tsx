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
			<span>{date}</span>
		</>
	);
}
export default BaseDate;
