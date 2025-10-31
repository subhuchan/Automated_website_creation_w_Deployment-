@echo off
echo ========================================
echo TDS App Builder v2.0
echo ========================================
echo.
echo Starting backend and frontend...
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both services
echo.

start "TDS Backend" cmd /k "cd backend && uvicorn app.main:app --reload"
timeout /t 3 /nobreak > nul
start "TDS Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both services are starting in separate windows...
echo.
echo Open http://localhost:5173 in your browser
echo.
pause
