// ============================================
// SERVER.JS - Backend Seguro para Lia Care
// ============================================

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importar base de conhecimento
const { buildContextPrompt, KNOWLEDGE_BASE } = require('./knowledge-base');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));

// Rate limiting para prevenir abuso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50 // máximo 50 requisições por IP
});
app.use('/api/', limiter);

// ============================================
// CONFIGURAÇÃO OPENAI
// ============================================

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt da Lia - NÍVEL ENTERPRISE
const SYSTEM_PROMPT = `Você é a LIA (Licenças e Inteligência em Ação), assistente de saúde corporativa da Lia Care.

🎯 IDENTIDADE E FUNÇÃO
- Assistente especializada em saúde ocupacional e bem-estar
- Parte do sistema de gestão de licenças médicas
- Tom: empático, profissional e acolhedor
- Sempre em português brasileiro

✅ DIRETRIZES OBRIGATÓRIAS

1. SEGURANÇA E COMPLIANCE
   - NUNCA solicite ou armazene dados pessoais sensíveis (CPF, RG, dados médicos detalhados)
   - NUNCA forneça diagnósticos médicos
   - NUNCA substitua orientação médica profissional
   - Sempre reforce: "Estas são orientações gerais. Siga as orientações do seu médico."

2. BASE DE CONHECIMENTO (USE APENAS ESTAS INFORMAÇÕES)
   - Dicas gerais de recuperação por tipo de lesão
   - Exercícios leves aprovados para reabilitação
   - Orientações de ergonomia e prevenção
   - Alimentação e hidratação para recuperação
   - Gestão de estresse durante afastamento

3. ESCOPO DE ATUAÇÃO
   ✅ PODE: Fornecer dicas gerais de bem-estar, exercícios leves, alimentação saudável
   ✅ PODE: Orientar sobre ergonomia e prevenção
   ✅ PODE: Motivar e apoiar emocionalmente
   ❌ NÃO PODE: Diagnosticar, prescrever medicamentos, alterar tratamento médico
   ❌ NÃO PODE: Acessar prontuários ou dados médicos reais
   ❌ NÃO PODE: Dar orientações que contradigam médicos

4. FORMATO DE RESPOSTA
   - Máximo 3-4 parágrafos ou 5-7 bullet points
   - Linguagem simples e acessível
   - Estruture com emojis quando apropriado (🏥 💪 🥗)
   - Sempre termine com mensagem motivadora

5. GOVERNANÇA CORPORATIVA
   - Represente os valores da empresa: cuidado, profissionalismo, ética
   - Respeite LGPD (Lei Geral de Proteção de Dados)
   - Em caso de dúvida sobre segurança, oriente a procurar RH ou médico
   
6. CASOS ESPECIAIS
   - Se a pergunta não for sobre saúde/bem-estar: "Minha especialidade é orientação sobre saúde e bem-estar. Posso ajudar com isso?"
   - Se pedir diagnóstico: "Não posso fazer diagnósticos. Por favor, consulte seu médico."
   - Se parecer emergência: "Parece ser uma situação urgente. Procure atendimento médico imediatamente ou ligue 192 (SAMU)."

Lembre-se: Você é uma ferramenta de apoio, não substitui profissionais de saúde.`;

// ============================================
// ROTAS DA API
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint principal de chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    // Validação
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato de mensagens inválido' });
    }

    // Limita tamanho do histórico
    const limitedMessages = messages.slice(-10);

    // Adiciona contexto do usuário com base de conhecimento
    let contextualMessages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Adiciona contexto específico da condição usando base de conhecimento
    if (userContext && userContext.condition) {
      const knowledgeContext = buildContextPrompt(userContext.condition);
      contextualMessages.push({
        role: 'system',
        content: knowledgeContext
      });
      
      // Log para auditoria (compliance)
      console.log(`[${new Date().toISOString()}] Contexto aplicado: ${userContext.condition}`);
    }

    contextualMessages = [...contextualMessages, ...limitedMessages];

    // Chama OpenAI com governança
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: contextualMessages,
      temperature: 0.7, // Controlado para respostas mais consistentes
      max_tokens: 500, // Limite para evitar respostas muito longas
      presence_penalty: 0.3, // Evita repetição
      frequency_penalty: 0.3,
      user: req.ip // Tracking para compliance e rate limiting
    });

    // Log de auditoria (em produção, usar Winston ou similar)
    console.log(`[${new Date().toISOString()}] Chat - IP: ${req.ip} - Tokens: ${completion.usage.total_tokens}`);

    // Disclaimer automático em todas as respostas
    const responseWithDisclaimer = completion.choices[0].message.content + 
      `\n\n---\n💡 ${KNOWLEDGE_BASE.disclaimers.general}`;

    res.json({
      message: responseWithDisclaimer,
      usage: completion.usage, // Para monitoramento de custos
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na API OpenAI:', error.message);

    // Fallback: resposta segura sem expor erro
    const fallbackResponse = `Desculpe, estou com dificuldades técnicas no momento. 😔\n\n` +
      `Enquanto isso, aqui estão algumas orientações gerais:\n\n` +
      `${KNOWLEDGE_BASE.generalWellness.nutrition.slice(0, 3).join('\n')}\n\n` +
      `${KNOWLEDGE_BASE.disclaimers.general}`;

    res.status(200).json({
      message: fallbackResponse,
      fallback: true,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para obter sugestões de perguntas
app.get('/api/suggestions', (req, res) => {
  const { condition } = req.query;

  const suggestions = {
    default: [
      'Quais exercícios posso fazer durante minha recuperação?',
      'Que tipo de alimentação é recomendada para minha condição?',
      'Como melhorar a qualidade do meu sono?',
      'Quais cuidados devo ter no dia a dia?',
      'Quanto tempo leva normalmente para recuperação completa?',
      'Como evitar que o problema se repita?'
    ],
    'dor nas costas': [
      'Quais alongamentos são seguros para dor nas costas?',
      'Posso usar compressa quente ou fria?',
      'Qual a melhor posição para dormir?',
      'Como sentar corretamente durante a recuperação?'
    ],
    'lesão muscular': [
      'Quando posso voltar a fazer exercícios?',
      'Devo usar gelo ou calor na lesão?',
      'Que alimentos ajudam na recuperação muscular?',
      'Como evitar nova lesão?'
    ]
  };

  const conditionKey = condition?.toLowerCase() || 'default';
  res.json({
    suggestions: suggestions[conditionKey] || suggestions.default
  });
});

// ============================================
// MIDDLEWARE DE ERRO
// ============================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// ============================================
// INICIALIZAÇÃO
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Servidor Lia Care rodando na porta ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configurada ✓' : 'NÃO configurada ✗'}`);
});

module.exports = app;
