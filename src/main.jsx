import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.jsx';
import './index.css';
import EventProvider from './providers/EventProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<EventProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<App />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</BrowserRouter>
		</EventProvider>
	</StrictMode>
);
