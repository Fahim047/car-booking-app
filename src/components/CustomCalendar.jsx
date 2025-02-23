import EventCalendar from '@/components/EventCalendar';
import { useEvents } from '@/hooks';
import { Loader2 } from 'lucide-react';

const CustomCalendar = () => {
	const { events, loading } = useEvents();
	if (loading) {
		return (
			<div className="min-h-screen">
				<Loader2 className="animate-spin" />
			</div>
		);
	}
	return <EventCalendar events={events} />;
};

export default CustomCalendar;
