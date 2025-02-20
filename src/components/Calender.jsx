import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const events = [
	{
		id: 1,
		title: 'Weekly Meeting',
		date: '2025-02-02',
		time: '02:00 PM',
		type: 'meeting',
	},
	{
		id: 2,
		title: 'Project Kickoff',
		date: '2025-02-04',
		time: '08:00 AM',
		type: 'project',
	},
	{
		id: 3,
		title: 'Happy Hour',
		date: '2025-02-12',
		time: '11:00 AM',
		type: 'social',
	},
	// Add more events as needed
];

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 1));
	const [view, setView] = useState('month');

	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();

	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	).getDay();

	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	const previousMonthDays = Array.from(
		{ length: firstDayOfMonth - 1 },
		(_, i) =>
			new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() -
			i
	).reverse();

	const getEventForDate = (date) => {
		const dateStr = `2025-02-${date.toString().padStart(2, '0')}`;
		return events.find((event) => event.date === dateStr);
	};

	return (
		<div className="flex-1 border">
			<div className="flex items-center justify-between mb-6 p-4">
				<div className="flex items-center gap-4">
					<h2 className="text-lg font-semibold">Feb, 2025</h2>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="icon">
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button variant="outline" size="icon">
							<ChevronRight className="w-4 h-4" />
						</Button>
						<Button variant="secondary" size="sm">
							Today
						</Button>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant={view === 'day' ? 'default' : 'ghost'}
						size="sm"
						onClick={() => setView('day')}
					>
						Day
					</Button>
					<Button
						variant={view === 'week' ? 'default' : 'ghost'}
						size="sm"
						onClick={() => setView('week')}
					>
						Week
					</Button>
					<Button
						variant={view === 'month' ? 'default' : 'ghost'}
						size="sm"
						onClick={() => setView('month')}
					>
						Month
					</Button>
				</div>
			</div>

			<div className="border">
				<div className="grid grid-cols-7 gap-px bg-muted">
					{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
						<div key={day} className="p-3 text-sm font-medium text-center">
							{day}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-px bg-muted">
					{previousMonthDays.map((day) => (
						<div
							key={`prev-${day}`}
							className="min-h-[120px] p-2 bg-background text-muted-foreground"
						>
							{day}
						</div>
					))}
					{days.map((day) => {
						const event = getEventForDate(day);
						return (
							<div key={day} className="min-h-[120px] p-2 bg-background">
								<span className="text-sm">{day}</span>
								{event && (
									<div
										className={cn(
											'mt-1 p-1 text-xs rounded',
											event.type === 'meeting' && 'bg-[#6C5DD3] text-white',
											event.type === 'project' && 'bg-pink-500 text-white',
											event.type === 'social' && 'bg-teal-500 text-white'
										)}
									>
										<div className="font-medium">{event.time}</div>
										<div>{event.title}</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
