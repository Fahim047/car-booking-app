import { Bell, ChevronDown, Menu, MessageSquare, Plus } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const Header = ({ setDialogOpen }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { pathname } = useLocation();
	const text =
		pathname === '/'
			? 'Calendar'
			: pathname === '/workflows'
			? 'Workflows'
			: 'Add Booking';

	return (
		<header className="h-16 py-4 flex items-center justify-between w-full">
			<h1 className="text-2xl font-semibold">{text}</h1>

			{/* Desktop Buttons */}
			<div className="hidden md:flex items-center gap-4">
				<Button
					className="bg-indigo-500 hover:bg-indigo-400"
					onClick={() => setDialogOpen(true)}
				>
					<Plus className="size-4" />
					Add Booking
				</Button>
				<Button variant="ghost" size="icon">
					<Bell className="size-6" />
				</Button>
				<Button variant="ghost" size="icon">
					<MessageSquare className="size-6" />
				</Button>
				<Button
					variant="ghost"
					className="gap-2 hover:bg-transparent cursor-pointer"
				>
					<Avatar className="size-8">
						<AvatarImage src="https://placehold.co/50" />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<ChevronDown className="size-4" />
				</Button>
			</div>

			{/* Mobile Hamburger Menu */}
			<Button
				variant="ghost"
				size="icon"
				className="md:hidden ml-auto"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				<Menu className="size-6" />
			</Button>

			{/* Mobile Menu Drawer */}
			{isMenuOpen && (
				<div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 md:hidden">
					<Button
						className="bg-indigo-500 hover:bg-indigo-400 w-full"
						onClick={() => {
							setDialogOpen(true);
							setIsMenuOpen(false);
						}}
					>
						<Plus className="size-4" />
						Add Booking
					</Button>
					<Button variant="ghost" size="icon">
						<Bell className="size-6" />
					</Button>
					<Button variant="ghost" size="icon">
						<MessageSquare className="size-6" />
					</Button>
					<Button
						variant="ghost"
						className="gap-2 hover:bg-transparent cursor-pointer"
					>
						<Avatar className="size-8">
							<AvatarImage src="https://placehold.co/50" />
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
						<ChevronDown className="size-4" />
					</Button>
				</div>
			)}
		</header>
	);
};

export default Header;
