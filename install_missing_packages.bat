@echo off
echo Installing missing packages for Python 3.11...
echo.

REM Find Python 3.11 installation
for %%p in (
    "C:\Users\adity\AppData\Local\Programs\Python\Python311\python.exe"
    "C:\Python311\python.exe"
    "python"
) do (
    if exist %%p (
        echo Found Python at: %%p
        %%p -m pip install google-generativeai==0.8.3
        goto :done
    )
)

:done
echo.
echo Installation complete!
pause
