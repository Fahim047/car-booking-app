import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import CustomCalendar from './components/CustomCalendar.jsx';
import NotFound from './components/NotFound.jsx';
import './index.css';
import MainLayout from './layouts/MainLayout.jsx';
import EventProvider from './providers/EventProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<EventProvider>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<CustomCalendar />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</EventProvider>
		</BrowserRouter>
	</StrictMode>
);
