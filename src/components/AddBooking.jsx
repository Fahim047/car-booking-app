import { format } from 'date-fns';
import { Calendar, Clock, MoreHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { useEvents } from '../hooks';
import { Button } from './ui/button';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from './ui/select';
const AddBookingDialog = ({ open, onOpenChange }) => {
	const { addEvent } = useEvents();
	const [title, setTitle] = useState('');
	const [car, setCar] = useState('');
	const [bookingDate, setBookingDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [selectedDays, setSelectedDays] = useState({
		Sat: false,
		Sun: false,
		Mon: false,
		Tue: true,
		Wed: false,
		Thu: false,
		Fri: false,
	});
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [repeatOn, setRepeatOn] = useState('');

	const weekDays = [
		{ key: 'Sat', label: 'S' },
		{ key: 'Sun', label: 'S' },
		{ key: 'Mon', label: 'M' },
		{ key: 'Tue', label: 'T' },
		{ key: 'Wed', label: 'W' },
		{ key: 'Thu', label: 'T' },
		{ key: 'Fri', label: 'F' },
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
		addEvent(newBooking);
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
							<h3 className="text-indigo-400 font-medium">Basic information</h3>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="title">Subject</Label>
									<Input
										name="title"
										id="title"
										placeholder="Write a short note"
										className="bg-gray-50 rounded-2xl"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="car">Select Car</Label>
									<Select
										id="car"
										name="car"
										value={car}
										onValueChange={setCar}
									>
										<SelectTrigger className="bg-gray-50 rounded-2xl">
											<SelectValue placeholder="Select a car" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Car</SelectLabel>
												<SelectItem value="toyota">Toyota</SelectItem>
												<SelectItem value="honda">Honda</SelectItem>
												<SelectItem value="ford">Ford</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="bookingDate">Booking Date</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-gray-50 rounded-2xl"
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
									<Label htmlFor="startTime">Start Time</Label>
									<div className="relative">
										<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
										<input
											type="time"
											className="w-full p-2 pl-10 border rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="endTime">End Time</Label>
									<div className="relative">
										<Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
										<input
											type="time"
											className="w-full p-2 pl-10 border rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Pick time"
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="space-y-2">
								<h3 className="text-indigo-400 font-medium">Repeat Option</h3>
								<Label htmlFor="repeatOn">Repeat On</Label>
								<Select
									name="repeatOn"
									id="repeatOn"
									value={repeatOn}
									onValueChange={setRepeatOn}
								>
									<SelectTrigger className="bg-gray-50 rounded-2xl">
										<SelectValue placeholder="Select frequency" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Frequency</SelectLabel>
											<SelectItem value="daily">Daily</SelectItem>
											<SelectItem value="weekly">Weekly</SelectItem>
											<SelectItem value="monthly">Monthly</SelectItem>
										</SelectGroup>
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
										<Label htmlFor={key}>{label}</Label>
									</div>
								))}
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">End Date</label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-left font-normal bg-gray-50 rounded-2xl"
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
						<Button
							type="button"
							variant="outline"
							className="text-indigo-500 hover:text-indigo-500 border-indigo-500 hover:bg-transparent rounded-2xl cursor-not-allowed"
						>
							Advanced
						</Button>
						<Button
							type="submit"
							className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-2xl"
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddBookingDialog;
