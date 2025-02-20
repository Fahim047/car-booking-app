import { format } from 'date-fns';
import { Calendar, Clock, MoreHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useEvents } from '../hooks';
import { Button } from './ui/button';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
const AddBookingDialog = ({ open, onOpenChange }) => {
	const { addEvent } = useEvents();
	const [title, setTitle] = useState('');
	const [car, setCar] = useState(null);
	const [bookingDate, setBookingDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [selectedDays, setSelectedDays] = useState({
		S: false,
		S2: false,
		M: false,
		T: true,
		W: false,
		T2: false,
		F: false,
	});
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [repeatOn, setRepeatOn] = useState(null);

	const weekDays = [
		{ key: 'S', label: 'S' },
		{ key: 'S2', label: 'S' },
		{ key: 'M', label: 'M' },
		{ key: 'T', label: 'T' },
		{ key: 'W', label: 'W' },
		{ key: 'T2', label: 'T' },
		{ key: 'F', label: 'F' },
	];

	const handleDayToggle = (day) => {
		setSelectedDays((prev) => ({
			...prev,
			[day]: !prev[day],
		}));
	};
	const formatDateTime = (date, time) => {
		return `${format(new Date(date), 'yyyy-MM-dd')} ${time}`;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			title,
			car,
			bookingDate,
			startTime,
			endTime,
			repeatOn,
			selectedDays,
			endDate,
		};
		const newBooking = {
			id: crypto.randomUUID(),
			title,
			start: formatDateTime(bookingDate, startTime),
			end: formatDateTime(endDate, endTime),
		};
		addEvent({
			title: 'test',
			id: crypto.randomUUID(),
			start: '2025-02-22',
			end: '2025-02-23',
		});
		console.log('Form Data:', formData);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="text-xl">Add Car Booking</DialogTitle>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="size-4" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onOpenChange(false)}
							>
								<X className="size-4" />
							</Button>
						</div>
					</div>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<div className="space-y-6">
						<div className="space-y-4">
							<h3 className="text-[#6C5DD3] font-medium">Basic information</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Subject</label>
									<Input
										name="title"
										placeholder="Write a short note"
										className="bg-gray-50"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Select Car</label>
									<Select value={car} onValueChange={setCar}>
										<SelectTrigger className="bg-gray-50">
											<SelectValue placeholder="Select a car" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="toyota">Toyota</SelectItem>
											<SelectItem value="honda">Honda</SelectItem>
											<SelectItem value="ford">Ford</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Booking Date</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-gray-50"
										>
											<Calendar className="mr-2 h-4 w-4" />
											{bookingDate
												? bookingDate.toDateString()
												: 'Select a date'}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<CalendarComponent
											mode="single"
											selected={bookingDate}
											onSelect={setBookingDate}
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Start Time</label>
									<div className="relative">
										<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
										<input
											type="time"
											className="w-full p-2 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">End Time</label>
									<div className="relative">
										<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
										<input
											type="time"
											className="w-full p-2 pl-10 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Pick time"
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-[#6C5DD3] font-medium">Repeat Option</h3>

							<div className="space-y-2">
								<label className="text-sm font-medium">Repeat On</label>
								<Select value={repeatOn} onValueChange={setRepeatOn}>
									<SelectTrigger className="bg-gray-50">
										<SelectValue placeholder="Select frequency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="daily">Daily</SelectItem>
										<SelectItem value="weekly">Weekly</SelectItem>
										<SelectItem value="monthly">Monthly</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex gap-4">
								{weekDays.map(({ key, label }) => (
									<div key={key} className="flex items-center space-x-2">
										<Checkbox
											id={key}
											checked={selectedDays[key]}
											onCheckedChange={() => handleDayToggle(key)}
											className="data-[state=checked]:bg-indigo-400 data-[state=checked]:border-indigo-400"
										/>
										<label
											htmlFor={key}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{label}
										</label>
									</div>
								))}
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">End Date</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-gray-50"
										>
											<Calendar className="mr-2 h-4 w-4" />
											{endDate ? endDate.toDateString() : 'Select a date'}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0">
										<CalendarComponent
											mode="single"
											selected={endDate}
											onSelect={setEndDate}
										/>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>

					<div className="flex justify-between mt-6">
						<Button type="button" variant="outline">
							Advanced
						</Button>
						<Button type="submit" className="bg-[#6C5DD3] hover:bg-[#5C4DC3]">
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddBookingDialog;
