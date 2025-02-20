import { useEvents } from '@/hooks';
import CalendarApp from './CalendarApp';

const CustomCalendar = () => {
	const { loading } = useEvents();
	if (loading) {
		return <div>Loading...</div>;
	}
	return <CalendarApp />;
};

export default CustomCalendar;
