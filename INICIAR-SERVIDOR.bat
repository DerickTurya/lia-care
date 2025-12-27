@echo off
echo ============================================
echo   LIA CARE - Iniciando Servidor Backend
echo ============================================
echo.

cd backend-example

echo Verificando configuracao...
if not exist ".env" (
    echo ERRO: Arquivo .env nao encontrado!
    echo Execute CONFIGURAR.bat primeiro.
    pause
    exit /b 1
)

echo.
echo Iniciando servidor em modo desenvolvimento...
echo.
echo O servidor estara disponivel em: http://localhost:3000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.
echo ============================================
echo.

npm run dev
