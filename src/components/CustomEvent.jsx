import { format } from 'date-fns';
import { Calendar, Car, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const CustomEvent = ({ event }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger
				asChild
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<p className="text-sm cursor-pointer w-full px-2 py-1 rounded-lg">
					{event.title}
				</p>
			</PopoverTrigger>
			<PopoverContent
				className="w-72 p-0 shadow-lg"
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<Card className="rounded-xl shadow-md bg-white">
					<CardContent className="p-4 space-y-3">
						<h3 className="font-semibold text-lg text-indigo-600">
							{event.title}
						</h3>
						<p className="text-gray-600 mt-2">{event.description}</p>
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<Calendar className="h-4 w-4 text-gray-400" />
							<span>{format(new Date(event.start), 'PPpp')}</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<Clock className="h-4 w-4 text-gray-400" />
							<span>{format(new Date(event.end), 'PPpp')}</span>
						</div>
						{event.car && (
							<div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 p-2 rounded-lg">
								<Car className="h-4 w-4 text-gray-500" />
								<span className="font-medium">{event.car}</span>
							</div>
						)}
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
};

export default CustomEvent;
