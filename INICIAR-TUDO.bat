@echo off
echo ============================================
echo   LIA CARE - Iniciando Servidores
echo ============================================
echo.

cd backend-example

echo [1/2] Iniciando Backend API (porta 3000)...
start "Lia Care - Backend API" cmd /k "node server.js"
timeout /t 2 /nobreak >nul

echo [2/2] Iniciando Servidor Web (porta 8080)...
start "Lia Care - Web Server" cmd /k "node web-server.js"
timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo   SERVIDORES ONLINE!
echo ============================================
echo.
echo Backend API: http://localhost:3000
echo Servidor Web: http://localhost:8080
echo.
echo Abrindo navegador...
echo.

timeout /t 2 /nobreak >nul
start http://localhost:8080

echo.
echo Para parar os servidores, feche as janelas de comando.
echo.
pause
