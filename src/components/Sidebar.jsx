import { Button } from '@/components/ui/button';
import {
	CalendarCheck2,
	CalendarDays,
	CalendarIcon,
	GitFork,
} from 'lucide-react';
import { NavLink } from 'react-router';

const Sidebar = () => {
	return (
		<div className="w-16 md:w-48 h-screen overflow-y-auto bg-background px-2 py-4 md:p-4">
			<div className="flex items-center justify-center md:justify-start gap-2 mb-8">
				<div className="rounded-lg flex items-center justify-center">
					<CalendarDays className="size-8 text-indigo-500" />
				</div>
				<span className="font-semibold text-xl hidden md:block">
					Car Booking
				</span>
			</div>
			<div className="space-y-2">
				<Button
					asChild
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2 bg-indigo-500 hover:bg-indigo-500 text-white hover:text-white"
				>
					<NavLink to="/">
						<CalendarIcon className="size-6" />
						<span className="hidden md:block">Calendar</span>
					</NavLink>
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2"
				>
					<CalendarCheck2 className="size-6" />
					<span className="hidden md:block text-gray-500">Add Booking</span>
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2"
				>
					<GitFork className="size-6 rotate-90" />
					<span className="hidden md:block text-gray-500">Workflows</span>
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
