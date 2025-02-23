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
			{/* Logo Section */}
			<div className="flex items-center justify-center md:justify-start gap-2 mb-8">
				<div className="rounded-lg flex items-center justify-center">
					<CalendarDays className="size-8 text-indigo-500" />
				</div>
				<span className="font-semibold text-xl hidden md:block">
					Car Booking
				</span>
			</div>

			{/* Navigation Links */}
			<div className="space-y-2">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex items-center w-full px-4 py-2 rounded-lg transition ${
							isActive
								? 'bg-indigo-500 text-white'
								: 'text-gray-700 hover:bg-gray-100'
						}`
					}
				>
					<CalendarIcon className="size-6" />
					<span className="hidden md:block ml-2">Calendar</span>
				</NavLink>

				<NavLink
					to="/add-booking"
					className={({ isActive }) =>
						`flex items-center w-full px-4 py-2 rounded-lg transition ${
							isActive
								? 'bg-indigo-500 text-white'
								: 'text-gray-700 hover:bg-gray-100'
						}`
					}
				>
					<CalendarCheck2 className="size-6" />
					<span className="hidden md:block ml-2">Add Booking</span>
				</NavLink>

				<NavLink
					to="/workflows"
					className={({ isActive }) =>
						`flex items-center w-full px-4 py-2 rounded-lg transition ${
							isActive
								? 'bg-indigo-500 text-white'
								: 'text-gray-700 hover:bg-gray-100'
						}`
					}
				>
					<GitFork className="size-6 rotate-90" />
					<span className="hidden md:block ml-2">Workflows</span>
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
