@echo off
echo ========================================
echo TDS App Builder v2.0 - Setup Script
echo ========================================
echo.

echo [1/5] Checking Python...
python --version
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.11+
    pause
    exit /b 1
)
echo.

echo [2/5] Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)
echo.

echo [3/5] Installing backend dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

echo [4/5] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo [5/5] Initializing database...
cd backend
python -c "from app.core.database import init_db; init_db()"
cd ..
echo Database initialized successfully!
echo.

echo ========================================
echo Setup Complete! 
echo ========================================
echo.
echo Next steps:
echo 1. Create a .env file with your credentials (see .env.example)
echo 2. Run start.bat to start the application
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
