import { Bell, ChevronDown, MessageSquare, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Button } from './components/ui/button';

export default function App() {
	return (
		<div className="min-h-screen flex bg-background px-4">
			<Sidebar />
			<main className="flex-1 flex flex-col h-screen overflow-y-auto">
				<header className="h-16 py-4 flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Calendar</h1>
					<div className="flex items-center gap-4">
						<Button className="bg-indigo-500 hover:bg-indigo-400">
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
				</header>
			</main>
		</div>
	);
}
