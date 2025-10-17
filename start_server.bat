@echo off
echo ====================================================================
echo Starting TDS Project 1 API Server
echo ====================================================================
echo.
echo Server will start at: http://localhost:8000
echo API endpoint: http://localhost:8000/api-endpoint
echo.
echo Press Ctrl+C to stop the server
echo ====================================================================
echo.

cd /d "%~dp0"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
