// ============================================
// API CLIENT - Lia Care Frontend
// ============================================

const API_BASE_URL = 'http://localhost:3000/api';

class LiaCareAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error' };
    }
  }

  // Enviar mensagem para IA
  async sendMessage(messages, userContext = null) {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          userContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Se retornou fallback, usa respostas locais
      if (data.fallback) {
        return {
          message: this.getFallbackResponse(messages[messages.length - 1].content),
          fallback: true
        };
      }

      return data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Fallback para respostas locais
      return {
        message: this.getFallbackResponse(messages[messages.length - 1].content),
        fallback: true
      };
    }
  }

  // Obter sugestões de perguntas
  async getSuggestions(condition = null) {
    try {
      const url = condition 
        ? `${this.baseURL}/suggestions?condition=${encodeURIComponent(condition)}`
        : `${this.baseURL}/suggestions`;
      
      const response = await fetch(url);
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error('Erro ao obter sugestões:', error);
      return this.getDefaultSuggestions();
    }
  }

  // Respostas fallback (offline)
  getFallbackResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('exerc') || lowerQuestion.includes('atividade')) {
      return `Com base em sua condição, recomendo:

**Durante a recuperação inicial (primeiros dias):**
- Repouso adequado é fundamental
- Movimentos leves e alongamentos suaves
- Caminhadas curtas se autorizado pelo médico

**Após melhora (com liberação médica):**
- Exercícios de baixo impacto (natação, caminhada)
- Alongamentos diários
- Evite esforços intensos até liberação completa

⚠️ Sempre consulte seu médico antes de iniciar qualquer atividade física!`;
    } 
    
    else if (lowerQuestion.includes('aliment') || lowerQuestion.includes('comer') || lowerQuestion.includes('dieta')) {
      return `Dicas de alimentação para sua recuperação:

**Alimentos recomendados:**
- Frutas ricas em vitamina C (laranja, acerola, kiwi)
- Proteínas magras (frango, peixe, ovos)
- Vegetais verde-escuros (couve, espinafre, brócolis)
- Grãos integrais
- Muita água (2-3 litros/dia)

**Evite:**
- Alimentos ultraprocessados
- Excesso de açúcar
- Bebidas alcoólicas
- Alimentos muito gordurosos

Uma boa alimentação acelera a recuperação! 🥗`;
    }
    
    else if (lowerQuestion.includes('sono') || lowerQuestion.includes('dormir') || lowerQuestion.includes('descanso')) {
      return `Dicas para melhorar seu sono durante a recuperação:

**Rotina:**
- Durma e acorde no mesmo horário
- 7-9 horas de sono por noite
- Cochilos de 20-30 minutos se necessário

**Ambiente:**
- Quarto escuro, silencioso e fresco
- Temperatura entre 18-22°C
- Colchão e travesseiro confortáveis

**Hábitos:**
- Evite telas 1h antes de dormir
- Chá de camomila pode ajudar
- Leitura leve antes de dormir
- Evite cafeína após 15h

O sono de qualidade é essencial para recuperação! 😴`;
    }
    
    else {
      return `Entendo sua preocupação. Aqui estão algumas orientações gerais:

**Cuidados importantes:**
1. Siga rigorosamente as orientações do seu médico
2. Mantenha uma rotina saudável de sono
3. Hidrate-se adequadamente
4. Alimente-se de forma balanceada
5. Evite esforços físicos excessivos
6. Mantenha acompanhamento médico regular

**Sinais de alerta:**
- Piora dos sintomas
- Febre persistente
- Dor intensa
- Qualquer mudança preocupante

➡️ Nestes casos, procure seu médico imediatamente!

Lembre-se: cada recuperação é única. Tenha paciência e cuide bem de você! 💙`;
    }
  }

  // Sugestões padrão
  getDefaultSuggestions() {
    return [
      'Quais exercícios posso fazer durante minha recuperação?',
      'Que tipo de alimentação é recomendada para minha condição?',
      'Como melhorar a qualidade do meu sono?',
      'Quais cuidados devo ter no dia a dia?',
      'Quanto tempo leva normalmente para recuperação completa?',
      'Como evitar que o problema se repita?'
    ];
  }
}

// Exporta instância única
const liaCareAPI = new LiaCareAPI();

// Para uso no browser
if (typeof window !== 'undefined') {
  window.LiaCareAPI = liaCareAPI;
}

// Para uso no Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LiaCareAPI;
}
