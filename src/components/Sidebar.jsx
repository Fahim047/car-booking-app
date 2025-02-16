import { Button } from '@/components/ui/button';
import { CalendarCheck, CalendarIcon, GitBranchPlus } from 'lucide-react';

const Sidebar = () => {
	return (
		<div className="w-16 md:w-48 h-screen overflow-y-auto bg-background py-4">
			<div className="flex items-center justify-center md:justify-start gap-2 mb-8">
				<div className="size-8 bg-indigo-500 rounded-lg flex items-center justify-center">
					<CalendarIcon className="size-5 text-white" />
				</div>
				<span className="font-semibold text-lg hidden md:block">
					Car Booking
				</span>
			</div>
			<div className="space-y-2">
				<Button
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2"
				>
					<CalendarIcon className="size-4" />
					<span className="hidden md:block">Calendar</span>
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2"
				>
					<CalendarCheck className="size-4" />
					<span className="hidden md:block">Add Booking</span>
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-center md:justify-start gap-2"
				>
					<GitBranchPlus className="size-4" />
					<span className="hidden md:block">Workflows</span>
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
