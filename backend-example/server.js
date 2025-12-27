// ============================================
// SERVER.JS - Backend Seguro para Lia Care
// ============================================

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

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

// System prompt da Lia
const SYSTEM_PROMPT = `Você é a Lia, uma assistente de saúde empática e profissional da Lia Care. 
Seu papel é fornecer dicas gerais de saúde e bem-estar para colaboradores em licença médica.

Sempre:
- Seja empática e acolhedora
- Forneça informações baseadas em evidências científicas
- Lembre que suas dicas são orientações gerais, não substituem consulta médica
- Use linguagem simples e acessível
- Organize informações em listas quando apropriado
- Incentive o colaborador a seguir as orientações médicas
- Seja positiva e motivadora sobre a recuperação

Nunca:
- Diagnostique condições médicas
- Prescreva medicamentos específicos
- Contradiga orientações médicas
- Use termos técnicos sem explicação
- Seja alarmista ou negativa`;

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

    // Adiciona contexto do usuário se disponível
    let contextualMessages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    if (userContext && userContext.condition) {
      contextualMessages.push({
        role: 'system',
        content: `Contexto do paciente: ${userContext.condition}${
          userContext.cid ? ` (CID: ${userContext.cid})` : ''
        }. Licença de ${userContext.days || 'alguns'} dias.`
      });
    }

    contextualMessages = [...contextualMessages, ...limitedMessages];

    // Chama OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: contextualMessages,
      temperature: 0.7,
      max_tokens: 500,
      user: req.ip // Tracking de usuário para compliance
    });

    // Log (em produção, usar logger profissional como Winston)
    console.log(`[${new Date().toISOString()}] Chat request - IP: ${req.ip}`);

    res.json({
      message: completion.choices[0].message.content,
      usage: completion.usage // Para monitoramento de custos
    });

  } catch (error) {
    console.error('Erro na API OpenAI:', error);

    // Não expõe detalhes do erro ao cliente
    res.status(500).json({
      error: 'Erro ao processar sua mensagem. Tente novamente.',
      fallback: true
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
