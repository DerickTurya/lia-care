# Lia Care Backend

Backend Node.js seguro para integração com OpenAI GPT.

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env e adicione sua OPENAI_API_KEY
```

## ▶️ Executar

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

## 📡 Endpoints

### `GET /api/health`
Health check do servidor

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-26T10:30:00.000Z"
}
```

### `POST /api/chat`
Envia mensagem e recebe resposta da IA

**Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Quais exercícios posso fazer?" }
  ],
  "userContext": {
    "condition": "dor nas costas",
    "cid": "M54.5",
    "days": "15"
  }
}
```

**Resposta:**
```json
{
  "message": "Para dor nas costas, recomendo...",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 200,
    "total_tokens": 350
  }
}
```

### `GET /api/suggestions?condition=dor%20nas%20costas`
Retorna sugestões de perguntas baseadas na condição

**Resposta:**
```json
{
  "suggestions": [
    "Quais alongamentos são seguros para dor nas costas?",
    "Posso usar compressa quente ou fria?",
    "Qual a melhor posição para dormir?"
  ]
}
```

## 🔒 Segurança

- ✅ CORS configurado
- ✅ Rate limiting (50 req/15min por IP)
- ✅ Validação de inputs
- ✅ Chave API em variável de ambiente
- ✅ Logs de requisições
- ✅ Error handling

## 📦 Deploy

### Heroku
```bash
heroku create lia-care-api
heroku config:set OPENAI_API_KEY=sk-proj-...
git push heroku main
```

### Vercel
```bash
vercel --prod
# Configure OPENAI_API_KEY nas environment variables
```

### Railway
```bash
railway login
railway init
railway up
# Adicione OPENAI_API_KEY nas variáveis
```

## 💰 Custos

Modelo: `gpt-4o-mini`
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens
- Estimativa: ~$0.01 por conversa

## 📊 Monitoramento

Acesse: https://platform.openai.com/usage

Configure alertas de uso!
