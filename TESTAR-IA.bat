@echo off
chcp 65001 >nul
cls

echo.
echo ============================================
echo    🚀 TESTE RÁPIDO - IA ENTERPRISE
echo ============================================
echo.

cd backend-example

echo [1/3] Verificando dependências...
if not exist node_modules (
    echo ❌ Node modules não encontrados!
    echo Execute primeiro: npm install
    pause
    exit /b 1
)
echo ✅ Dependências OK

echo.
echo [2/3] Verificando API Key...
findstr /C:"OPENAI_API_KEY=sk-proj-" .env >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ API Key configurada
) else (
    echo ⚠️  API Key não configurada
    echo    Edite: backend-example\.env
    echo    Linha: OPENAI_API_KEY=sk-proj-sua-chave
    echo.
    echo    Obtenha em: https://platform.openai.com/api-keys
    pause
)

echo.
echo [3/3] Iniciando servidor...
echo.
echo ============================================
echo  SERVIDOR RODANDO: http://localhost:3000
echo ============================================
echo.
echo  📡 API Endpoints:
echo     GET  /api/health
echo     POST /api/chat
echo     GET  /api/suggestions
echo.
echo  🧪 Teste rápido:
echo     curl http://localhost:3000/api/health
echo.
echo  Press Ctrl+C para parar
echo ============================================
echo.

node server.js
