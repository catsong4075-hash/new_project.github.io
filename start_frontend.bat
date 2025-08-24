@echo off
echo Starting the frontend development server on port 3000...
echo Make sure you have run 'npm install' in the 'frontend' directory first.

cd frontend
:: The vite config is set to automatically open the browser
start "Frontend Dev Server" npm run dev

exit