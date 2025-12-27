const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// Rota padrão
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🌐 Servidor Web rodando em: http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${path.join(__dirname, '..')}\n`);
    console.log('✅ Acesse: http://localhost:8080\n');
});
