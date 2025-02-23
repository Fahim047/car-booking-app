import { MoreHorizontal, X } from 'lucide-react';
import BookingForm from './BookingForm';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
const BookingFormDialog = ({ open, onOpenChange }) => {
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
				<BookingForm onClose={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default BookingFormDialog;
