@echo off
chcp 65001 >nul
color 0B

echo.
echo ============================================
echo    GIT COMMIT RÁPIDO - LIA CARE
echo ============================================
echo.

cd /d "%~dp0"

REM Verifica se há mudanças
git status --short
echo.

REM Pede mensagem do commit
set /p mensagem="Digite a mensagem do commit: "

if "%mensagem%"=="" (
    echo ❌ Mensagem vazia! Cancelando...
    pause
    exit /b
)

echo.
echo 📦 Adicionando arquivos...
git add .

echo.
echo 💾 Criando commit...
git commit -m "%mensagem%"

echo.
echo 🚀 Enviando para GitHub...
git push

echo.
echo ============================================
echo    ✅ ATUALIZAÇÃO CONCLUÍDA!
echo ============================================
echo.
echo Aguarde 1-2 minutos para as mudanças
echo aparecerem no site online.
echo.
pause
