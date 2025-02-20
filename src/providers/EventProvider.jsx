import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useState } from 'react';
import EventContext from '../contexts/EventContext';
const EventProvider = ({ children }) => {
	const [eventsService] = useState(() => createEventsServicePlugin());

	const [events, setEvents] = useState([
		{
			id: '1',
			start: '2025-02-12 10:22',
			end: '2025-02-12 11:22',
			title: 'hello',
		},
	]);
	const [loading, setLoading] = useState(false);

	const addEvent = (newEvent) => {
		console.log('adding...');
		eventsService.set([...events, newEvent]);
		setEvents((prev) => [...prev, newEvent]);
	};
	// useEffect(() => {
	// 	const fetchAndAddBankHolidays = async () => {
	// 		try {
	// 			const response = await fetch('https://www.gov.uk/bank-holidays.json');
	// 			const data = await response.json();

	// 			const holidays = data['england-and-wales'].events.map(
	// 				(event, index) => ({
	// 					id: `holiday-${index}`,
	// 					title: event.title,
	// 					start: event.date,
	// 					end: event.date,
	// 					description: event.notes || 'Public Holiday',
	// 					isReadOnly: true,
	// 				})
	// 			);

	// 			setEvents(holidays);
	// 		} catch (error) {
	// 			console.error('Error fetching bank holidays:', error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchAndAddBankHolidays();
	// }, []);
	const contextInfo = {
		events,
		loading,
		addEvent,
		eventsService,
	};

	return (
		<EventContext.Provider value={contextInfo}>
			{children}
		</EventContext.Provider>
	);
};

export default EventProvider;
