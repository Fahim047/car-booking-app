import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './components/CustomToolbar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './components/ui/popover';

const locales = {
	'en-US': enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
const CustomEvent = ({ event }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger
				asChild
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<p className="text-sm cursor-pointer w-full">{event.title}</p>
			</PopoverTrigger>
			<PopoverContent className="w-60 p-4 shadow-lg">
				<h3 className="font-semibold text-lg">{event.title}</h3>
				<p className="text-sm text-gray-600">
					{format(new Date(event.start), 'PPpp')} -{' '}
					{format(new Date(event.end), 'PPpp')}
				</p>
				{event.description && (
					<p className="text-xs mt-2">{event.description}</p>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default function EventCalendar({ events }) {
	const [view, setView] = useState('month');
	const [date, setDate] = useState(new Date());
	return (
		<div className="flex h-full flex-col">
			<div className="flex-1 p-6 border">
				<BigCalendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: '500px' }}
					views={['month', 'week', 'day']}
					defaultView="month"
					toolbar={true}
					navigatable={true}
					view={view} // Controls the current view
					onView={setView} // Updates view state
					date={date} // Controls the current date
					onNavigate={setDate} // Updates date when navigating
					components={{
						event: CustomEvent, // Use the custom event renderer
						toolbar: CustomToolbar,
					}}
					eventPropGetter={(event) => {
						const isBackgroundEvent = event.isReadOnly;

						return {
							className: isBackgroundEvent ? 'background-event' : '',
							style: {
								backgroundColor: isBackgroundEvent ? 'indigo' : 'limegreen',
								// color: isBackgroundEvent ? 'transparent' : 'white',
								borderRadius: '5px',
								padding: '4px',
							},
						};
					}}
					tooltipAccessor={null}
				/>
			</div>
		</div>
	);
}
