# 🏢 Arquitetura Enterprise - IA Real com Governança

## 📋 Visão Geral

Esta é uma implementação **nível profissional** de IA conversacional com OpenAI, preparada para ambientes corporativos. Não expõe chaves de API, aplica governança rigorosa e garante compliance com LGPD.

---

## 🎯 Por Que Backend? (Não Frontend Direto)

### ❌ Problema: IA no Frontend
```javascript
// NUNCA FAÇA ISSO! 
const openai = new OpenAI({ 
    apiKey: 'sk-proj-...' // ⚠️ EXPOSTO NO CÓDIGO DO NAVEGADOR!
});
```

**Riscos:**
- ✗ Qualquer pessoa pode ver sua API Key no código-fonte
- ✗ Sem controle de uso (podem gastar $1000+ em minutos)
- ✗ Sem governança (podem fazer perguntas inapropriadas)
- ✗ Sem logs de auditoria
- ✗ Sem filtros de segurança

### ✅ Solução: Backend Seguro

```
┌─────────────┐      HTTPS      ┌──────────────┐     API Key     ┌──────────┐
│  Frontend   │ ────────────────>│   Backend    │ ────Segura────> │  OpenAI  │
│  (Público)  │   Sem API Key   │   (Privado)  │   no Servidor   │          │
└─────────────┘                  └──────────────┘                 └──────────┘
     ↑                                  │
     │                                  ↓
     │                           ┌──────────────┐
     │                           │ Governança   │
     └───────────────────────────│ • Rate Limit │
              Resposta           │ • Logs       │
              Controlada         │ • Filtros    │
                                 └──────────────┘
```

---

## 🔐 Camadas de Segurança Implementadas

### 1️⃣ **Proteção de API Key**
```javascript
// .env (NUNCA comitar no Git)
OPENAI_API_KEY=sk-proj-sua-chave-real

// server.js
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY; // ✅ Seguro
```

### 2️⃣ **Rate Limiting**
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50 // máximo 50 requests por IP
});
app.use('/api/', limiter);
```
**Protege contra:** Abuso, DDoS, estouro de custos

### 3️⃣ **CORS Controlado**
```javascript
app.use(cors({
  origin: 'https://seusite.com', // Apenas seu domínio
  credentials: true
}));
```
**Protege contra:** Requisições de sites maliciosos

### 4️⃣ **Validação de Input**
```javascript
if (!messages || !Array.isArray(messages)) {
  return res.status(400).json({ error: 'Inválido' });
}
const limitedMessages = messages.slice(-10); // Limita histórico
```
**Protege contra:** Injection attacks, overflow de tokens

### 5️⃣ **Logs de Auditoria**
```javascript
console.log(`[${new Date().toISOString()}] Chat - IP: ${req.ip} - Tokens: ${tokens}`);
```
**Permite:** Compliance, investigação de incidentes, análise de custos

---

## 🧠 Governança com Base de Conhecimento

### Problema: IA sem controle pode:
- Dar conselhos médicos perigosos
- Vazar dados sensíveis
- Responder perguntas fora do escopo
- Violar LGPD

### Solução: System Prompt + Base de Conhecimento

```javascript
// 1. System Prompt com regras rígidas
const SYSTEM_PROMPT = `
Você é a LIA, assistente corporativa.

✅ PODE: Dicas gerais de bem-estar
❌ NÃO PODE: Diagnósticos, prescrições
`;

// 2. Base de conhecimento aprovada
const KNOWLEDGE_BASE = {
  lombalgia: {
    tips: ['Gelo 48h', 'Alongamentos leves'],
    warnings: ['Evite carregar peso']
  }
};

// 3. Contexto personalizado por condição
const context = buildContextPrompt(userCondition);
```

**Resultado:**
- ✅ Respostas consistentes e seguras
- ✅ Baseadas em informações aprovadas pela equipe médica
- ✅ Sempre incluem disclaimer legal
- ✅ Detectam emergências e orientam buscar ajuda

---

## 📊 Monitoramento de Custos

### Tracking de Uso
```javascript
res.json({
  message: response,
  usage: {
    prompt_tokens: 150,
    completion_tokens: 200,
    total_tokens: 350 // Usado para calcular custo
  }
});
```

### Custo Estimado (GPT-4o-mini)
- Input: $0.15 / 1M tokens
- Output: $0.60 / 1M tokens
- **Exemplo:** 1000 conversas/dia ≈ $5-15/mês

### Estratégias de Economia
1. **Modelo econômico:** `gpt-4o-mini` (15x mais barato que GPT-4)
2. **Limite de tokens:** `max_tokens: 500`
3. **Histórico limitado:** Últimas 10 mensagens apenas
4. **Cache de respostas:** Para perguntas frequentes (TODO)

---

## 🚀 Deployment Profissional

### Opção 1: Vercel (Recomendado para começar)
```bash
npm install -g vercel
vercel --prod
```
**Vantagens:**
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Serverless (paga só o que usa)
- ✅ Free tier generoso

### Opção 2: Netlify Functions
```bash
netlify deploy --prod
```

### Opção 3: Railway / Render
- Ideal para API que roda 24/7
- Suporte a WebSockets (futuro)

### Opção 4: AWS Lambda (Enterprise)
- Máximo controle e escalabilidade
- Integração com CloudWatch para logs
- Mais complexo de configurar

---

## 📋 Compliance e LGPD

### Dados que NÃO armazenamos:
- ❌ Dados médicos detalhados
- ❌ CPF, RG, documentos
- ❌ Histórico de conversas completo
- ❌ Informações sensíveis

### Dados que podemos armazenar (anonimizados):
- ✅ Tipo de condição (lombalgia, tendinite)
- ✅ Estatísticas de uso (quantas perguntas/dia)
- ✅ Logs de auditoria (IP, timestamp)
- ✅ Feedback sobre qualidade das respostas

### User Tracking OpenAI
```javascript
user: req.ip // OpenAI usa para rate limiting deles
```
**Importante:** OpenAI não armazena conversas se você configurar data retention policy

---

## 🧪 Testes e Qualidade

### 1. Testes de Segurança
```bash
# Testar rate limiting
for i in {1..60}; do curl http://localhost:3000/api/chat; done

# Testar CORS
curl -H "Origin: http://site-malicioso.com" http://localhost:3000/api/chat
```

### 2. Testes de Governança
- [ ] IA recusa diagnosticar?
- [ ] IA reforça "consulte seu médico"?
- [ ] IA detecta emergências?
- [ ] IA respeita escopo (não responde sobre política, etc)?

### 3. Testes de Fallback
- [ ] O que acontece se OpenAI cair?
- [ ] Mensagem de erro é user-friendly?
- [ ] Sistema continua funcionando?

---

## 📈 Métricas de Sucesso

### KPIs Técnicos
- **Latência:** < 2s por resposta
- **Uptime:** > 99.5%
- **Taxa de erro:** < 1%
- **Custo/usuário:** < $0.50/mês

### KPIs de Negócio
- **Satisfação:** NPS > 40
- **Adoção:** 60%+ colaboradores usam
- **Redução de chamados RH:** -30%
- **Tempo de recuperação:** Mantido ou melhorado

---

## 🔄 Roadmap Futuro

### Fase 2: Melhorias
- [ ] Cache de respostas (Redis)
- [ ] Embeddings para busca semântica
- [ ] Fine-tuning com casos reais
- [ ] Suporte a voz (Speech-to-Text)

### Fase 3: Integrações
- [ ] Integrar com WhatsApp Business
- [ ] Integrar com MS Teams
- [ ] Dashboard analytics para RH
- [ ] Exportar relatórios para gestores

### Fase 4: IA Avançada
- [ ] RAG (Retrieval-Augmented Generation)
- [ ] Vector database para documentação médica
- [ ] Modelo próprio fine-tunado
- [ ] Análise preditiva de afastamentos

---

## 🎓 Referências e Recursos

### Documentação Oficial
- [OpenAI API Docs](https://platform.openai.com/docs)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [LGPD - Lei Geral de Proteção de Dados](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

### Segurança
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Rate Limiting Strategies](https://www.npmjs.com/package/express-rate-limit)

### Custos
- [OpenAI Pricing](https://openai.com/api/pricing/)
- [Token Counter](https://platform.openai.com/tokenizer)

---

## ✅ Checklist de Produção

Antes de ir para produção, verificar:

**Segurança:**
- [ ] API Key em variável de ambiente (nunca no código)
- [ ] HTTPS configurado
- [ ] CORS restrito ao seu domínio
- [ ] Rate limiting ativo
- [ ] Validação de inputs
- [ ] Logs de auditoria funcionando

**Governança:**
- [ ] System prompt revisado por jurídico/compliance
- [ ] Base de conhecimento validada por médico do trabalho
- [ ] Disclaimers em todas as respostas
- [ ] Detecção de emergências implementada

**Performance:**
- [ ] Testes de carga realizados
- [ ] Fallback funcionando
- [ ] Monitoramento de custos configurado
- [ ] Alertas de erro configurados

**Legal:**
- [ ] Termos de uso criados
- [ ] Política de privacidade atualizada
- [ ] Consentimento LGPD implementado
- [ ] Direito ao esquecimento implementado

---

## 📞 Suporte

Para dúvidas técnicas:
1. Revise este documento
2. Consulte `README-IA.md`
3. Veja exemplos em `backend-example/`
4. Teste localmente antes de deploy

**Boa sorte! 🚀**

*Última atualização: 26/12/2025*
