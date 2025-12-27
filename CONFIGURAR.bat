@echo off
echo ============================================
echo   LIA CARE - Configuracao Inicial
echo ============================================
echo.

echo [1/3] Verificando instalacao do Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js em https://nodejs.org/
    pause
    exit /b 1
)
echo OK! Node.js instalado.
echo.

echo [2/3] Verificando dependencias...
cd backend-example
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
) else (
    echo OK! Dependencias ja instaladas.
)
echo.

echo [3/3] Verificando configuracao da API...
if not exist ".env" (
    echo AVISO: Arquivo .env nao encontrado!
    echo Criando .env a partir do exemplo...
    copy .env.example .env >nul
    echo.
    echo IMPORTANTE: Edite o arquivo backend-example\.env
    echo e adicione sua chave da OpenAI API!
    echo.
    echo Obtenha sua chave em: https://platform.openai.com/api-keys
    echo.
) else (
    findstr /C:"sk-proj-COLE_SUA_CHAVE_AQUI" .env >nul
    if %errorlevel% equ 0 (
        echo.
        echo ============================================
        echo   ATENCAO: Configure sua chave da API!
        echo ============================================
        echo.
        echo Edite: backend-example\.env
        echo Substitua: OPENAI_API_KEY=sk-proj-COLE_SUA_CHAVE_AQUI
        echo Por: OPENAI_API_KEY=sua-chave-real
        echo.
        echo Obtenha em: https://platform.openai.com/api-keys
        echo.
    ) else (
        echo OK! Chave API configurada.
    )
)

echo.
echo ============================================
echo   Configuracao concluida!
echo ============================================
echo.
echo Para iniciar o servidor:
echo   cd backend-example
echo   npm run dev
echo.
echo Para abrir a aplicacao:
echo   Abra: tela-01-entrada.html no navegador
echo.
pause
