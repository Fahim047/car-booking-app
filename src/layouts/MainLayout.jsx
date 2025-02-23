import BookingFormDialog from '@/components/BookingFormDialog';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const MainLayout = () => {
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<>
			<div className="min-h-screen flex bg-background">
				<Sidebar />
				<main className="flex-1 flex flex-col h-screen overflow-y-auto pr-2 md:pr-4">
					<Header setDialogOpen={setDialogOpen} />
					<Outlet />
				</main>
				<BookingFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
				<Toaster richColors position="top-right" />
			</div>
		</>
	);
};

export default MainLayout;
