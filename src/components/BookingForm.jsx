import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useEvents } from '../hooks';
import { Button } from './ui/button';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Checkbox } from './ui/checkbox';
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

const BookingForm = ({ onClose, initialData = {} }) => {
	const { addEvent } = useEvents();
	const [note, setNote] = useState(initialData.note || '');
	const [car, setCar] = useState(initialData.car || '');
	const [bookingDate, setBookingDate] = useState(
		initialData.bookingDate || null
	);
	const [endDate, setEndDate] = useState(initialData.endDate || null);
	const [selectedDays, setSelectedDays] = useState(
		initialData.selectedDays || {
			Sat: false,
			Sun: false,
			Mon: false,
			Tue: true,
			Wed: false,
			Thu: false,
			Fri: false,
		}
	);
	const [startTime, setStartTime] = useState(initialData.startTime || '');
	const [endTime, setEndTime] = useState(initialData.endTime || '');
	const [repeatOn, setRepeatOn] = useState(initialData.repeatOn || '');

	// Weekdays
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
		if (!date || !time) return null;
		return `${format(new Date(date), 'yyyy-MM-dd')} ${time}`;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!note ||
			!car ||
			!bookingDate ||
			!endDate ||
			!startTime ||
			!endTime ||
			!repeatOn
		) {
			toast.warning('Please fill all fields');
			return;
		}

		const newBooking = {
			id: crypto.randomUUID(),
			title: 'Car Booked',
			description: note,
			start: new Date(formatDateTime(bookingDate, startTime)),
			end: new Date(formatDateTime(endDate, endTime)),
			car,
		};

		addEvent(newBooking);
		onClose?.();
		toast.success('Booking successful');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-6">
				<div className="space-y-4">
					<h3 className="text-indigo-400 font-medium">Basic information</h3>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="note">Subject</Label>
							<Input
								name="note"
								id="note"
								placeholder="Write a short note"
								className="bg-gray-50 rounded-2xl"
								value={note}
								onChange={(e) => setNote(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="car">Select Car</Label>
							<Select id="car" name="car" value={car} onValueChange={setCar}>
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
									{bookingDate ? bookingDate.toDateString() : 'Select a date'}
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
	);
};

export default BookingForm;
