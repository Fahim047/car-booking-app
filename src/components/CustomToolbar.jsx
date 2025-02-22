import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const CustomToolbar = ({ label, onView, views, view, onNavigate }) => {
	return (
		<div className="flex flex-wrap gap-4 justify-between items-center p-4 rounded-md">
			{/* Left: Navigation Buttons */}
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="text-lg font-semibold">{label}</h3>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onNavigate('PREV')}
				>
					<ChevronLeft className="w-4 h-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => onNavigate('NEXT')}
				>
					<ChevronRight className="w-4 h-4" />
				</Button>
				<Button variant="outline" onClick={() => onNavigate('TODAY')}>
					Today
				</Button>
			</div>

			{/* Right: View Buttons (Week, Month, Day) */}
			<div className="flex gap-2">
				{views.map((v) => (
					<Button
						key={v}
						variant={view === v ? 'default' : 'outline'}
						onClick={() => onView(v)}
						className={`${
							view === v ? 'bg-indigo-500 text-white hover:bg-indigo-500' : ''
						} capitalize`}
					>
						{v}
					</Button>
				))}
			</div>
		</div>
	);
};
export default CustomToolbar;
