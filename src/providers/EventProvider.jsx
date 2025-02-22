import { useEffect, useState } from 'react';
import EventContext from '../contexts/EventContext';
const EventProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const addEvent = (newEvent) => {
		console.log('adding...');
		setEvents((prev) => [
			...prev,
			{
				title: 'Weekly Meetup',
				description: 'A friends gathering',
				start: new Date(2025, 1, 16, 14, 0),
				end: new Date(2025, 1, 17, 15, 30),
				id: 2,
			},
		]);
	};
	useEffect(() => {
		const fetchAndAddBankHolidays = async () => {
			try {
				const response = await fetch('https://www.gov.uk/bank-holidays.json');
				const data = await response.json();

				const holidays = data['england-and-wales'].events.map(
					(event, index) => ({
						id: `holiday-${index}`,
						title: event.title,
						start: new Date(event.date),
						end: new Date(event.date),
						allDay: true,
						description: event.notes || 'Public Holiday',
						isReadOnly: true,
					})
				);

				setEvents([...holidays]);
			} catch (error) {
				console.error('Error fetching bank holidays:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchAndAddBankHolidays();
	}, []);
	const contextInfo = {
		events,
		loading,
		addEvent,
	};

	return (
		<EventContext.Provider value={contextInfo}>
			{children}
		</EventContext.Provider>
	);
};

export default EventProvider;
