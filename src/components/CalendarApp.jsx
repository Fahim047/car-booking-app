import { useEvents } from '@/hooks';
import {
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
const CalendarApp = () => {
	const { events, eventsService } = useEvents();
	const calendar = useCalendarApp({
		defaultView: createViewMonthGrid().name,
		views: [
			createViewDay(),
			createViewWeek(),
			createViewMonthGrid(),
			createViewMonthAgenda(),
		],
		events,
		plugins: [
			eventsService,
			createEventModalPlugin(),
			createDragAndDropPlugin(),
		],
	});
	if (!calendar) return null;
	return <ScheduleXCalendar calendarApp={calendar} />;
};

export default CalendarApp;
