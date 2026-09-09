@echo off
cd /d "%~dp0.."
if exist ".venv\Scripts\python.exe" (
  ".venv\Scripts\python.exe" admin_main.py
) else (
  python admin_main.py
)
pause
