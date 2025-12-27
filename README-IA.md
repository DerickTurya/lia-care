# 🏥 Lia Care - Dicas de Saúde com IA

## 🤖 Integração com OpenAI GPT

A Lia Care agora oferece **dicas personalizadas de saúde** usando a API da OpenAI (GPT-4o-mini).

---

## 📋 Configuração da API

### 1. Obter Chave da API OpenAI

1. Acesse: https://platform.openai.com/
2. Faça login ou crie uma conta
3. Vá em **API Keys** no menu lateral
4. Clique em **"Create new secret key"**
5. Copie a chave gerada (começa com `sk-...`)

### 2. Configurar no Sistema

Abra o arquivo `tela-dicas-saude.html` e localize a linha:

```javascript
const OPENAI_API_KEY = 'SUA_CHAVE_API_AQUI';
```

Substitua `SUA_CHAVE_API_AQUI` pela sua chave real:

```javascript
const OPENAI_API_KEY = 'sk-proj-xxxxxxxxxxxxxxxxxxxxx';
```

### 3. Custos da API

- **Modelo usado**: `gpt-4o-mini` (mais econômico)
- **Custo aproximado**: 
  - Input: $0.150 por 1M tokens
  - Output: $0.600 por 1M tokens
- **Estimativa**: ~$0.01 por conversa completa (10-20 mensagens)

---

## 🔒 Segurança - IMPORTANTE!

### ⚠️ NUNCA exponha sua chave API em produção!

A configuração atual é apenas para **demonstração/desenvolvimento local**.

### 🛡️ Para Produção:

1. **Backend Necessário**: Crie uma API Node.js/Python que:
   - Armazene a chave da OpenAI de forma segura (variáveis de ambiente)
   - Receba requisições do frontend
   - Faça chamadas para a OpenAI
   - Retorne respostas para o frontend

2. **Estrutura Recomendada**:

```
Frontend (HTML/JS)
    ↓ (requisição HTTPS)
Seu Backend (Node.js/Python)
    ↓ (com chave segura)
OpenAI API
```

### Exemplo de Backend Simples (Node.js):

```javascript
// server.js
const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Chave em .env
});

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    });
    
    res.json(completion.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

app.listen(3000, () => console.log('Server rodando na porta 3000'));
```

---

## 🎯 Funcionalidades

### Dicas Personalizadas sobre:

- 🏃‍♂️ **Exercícios seguros** durante recuperação
- 🥗 **Alimentação adequada** para cada condição
- 😴 **Melhoria do sono** e descanso
- ⚕️ **Cuidados gerais** no dia a dia
- ⏱️ **Tempo de recuperação** esperado
- 🛡️ **Prevenção** de recorrências

### Contexto Personalizado:

O sistema considera:
- Condição médica do colaborador
- CID (Classificação Internacional de Doenças)
- Número de dias de licença
- Histórico da conversa

---

## 💬 Fallback (Respostas Offline)

Se a API OpenAI não estiver disponível ou configurada, o sistema usa **respostas pré-programadas** baseadas em palavras-chave:

- Exercícios → Dicas gerais de atividade física
- Alimentação → Orientações nutricionais básicas
- Sono → Higiene do sono
- Padrão → Cuidados gerais de recuperação

---

## 🧪 Teste Local

1. Abra `tela-dicas-saude.html` no navegador
2. Digite perguntas como:
   - "Quais exercícios posso fazer?"
   - "Que tipo de alimentação é recomendada?"
   - "Como melhorar meu sono?"
3. Use os botões de **Perguntas Rápidas**

---

## 📱 Alternativas de IA

Se preferir outras APIs:

### Google Gemini (gratuito até certo limite)
- API: https://ai.google.dev/
- Modelo: `gemini-pro`
- Vantagem: Quota gratuita generosa

### Anthropic Claude
- API: https://www.anthropic.com/api
- Modelo: `claude-3-haiku` (econômico)
- Vantagem: Excelente para saúde e bem-estar

### Azure OpenAI
- API: https://azure.microsoft.com/pt-br/products/ai-services/openai-service
- Vantagem: Integração empresarial, compliance

---

## 📊 Monitoramento de Uso

Monitore seu uso em: https://platform.openai.com/usage

- Defina **limites de gastos mensais**
- Ative **alertas de uso**
- Revise **logs de chamadas**

---

## 🚀 Melhorias Futuras

- [ ] Salvar histórico de conversas no backend
- [ ] Integração com prontuário médico
- [ ] Notificações proativas de cuidados
- [ ] Lembretes de medicação
- [ ] Dashboard de evolução da recuperação
- [ ] Integração com wearables (Apple Watch, Fitbit)

---

## ❓ Suporte

Para dúvidas sobre a integração, consulte:
- 📖 [Documentação OpenAI](https://platform.openai.com/docs)
- 💬 [Community Forum](https://community.openai.com/)
- 📧 Contato interno: equipe de desenvolvimento

---

**⚠️ Aviso Legal**: As dicas fornecidas pela IA são orientações gerais e **não substituem consulta médica profissional**. Sempre incentive colaboradores a seguirem as orientações de seus médicos.
