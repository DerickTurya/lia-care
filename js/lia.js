/**
 * LIA - Licenças e Inteligência em Ação
 * IA simulada com base de conhecimento
 * Funciona 100% no front-end, sem backend
 */

class LiaIA {
    constructor() {
        this.knowledgeBase = null;
        this.conversationHistory = [];
        this.loadAllKnowledgeBases();
    }

    // Carrega TODAS as bases de conhecimento modulares
    async loadAllKnowledgeBases() {
        try {
            const bases = [
                'js/knowledge-base-geral.json',
                'js/knowledge-base-licencas.json',
                'js/knowledge-base-processos.json',
                'js/knowledge-base-saude.json',
                'js/knowledge-base-financeiro.json'
            ];

            console.log('🔄 Carregando bases de conhecimento...');
            
            const promises = bases.map(url => 
                fetch(url)
                    .then(res => res.json())
                    .catch(err => {
                        console.warn(`⚠️ Erro ao carregar ${url}:`, err);
                        return {};
                    })
            );

            const results = await Promise.all(promises);
            
            // Mescla todas as bases em uma única
            this.knowledgeBase = {};
            results.forEach(base => {
                this.knowledgeBase = { ...this.knowledgeBase, ...base };
            });

            const totalTopics = Object.keys(this.knowledgeBase).length;
            console.log(`✅ ${bases.length} bases carregadas com ${totalTopics} tópicos!`);
            console.log('📚 Categorias:', Object.keys(this.knowledgeBase));
            
        } catch (error) {
            console.error('❌ Erro ao carregar bases de conhecimento:', error);
            this.knowledgeBase = this.getFallbackKnowledge();
        }
    }

    // Base de conhecimento mínima de fallback
    getFallbackKnowledge() {
        return {
            fallback: {
                respostas: ["Desculpe, estou com dificuldades técnicas. Por favor, tente novamente em instantes."]
            }
        };
    }

    // Processa mensagem do usuário
    async processMessage(userMessage) {
        if (!this.knowledgeBase) {
            await this.loadKnowledgeBase();
        }

        // Adiciona ao histórico
        this.conversationHistory.push({
            role: 'user',
            message: userMessage,
            timestamp: new Date()
        });

        // Normaliza entrada
        const normalizedInput = this.normalizeText(userMessage);

        // Busca resposta
        const response = this.findBestResponse(normalizedInput);

        // Adiciona resposta ao histórico
        this.conversationHistory.push({
            role: 'assistant',
            message: response,
            timestamp: new Date()
        });

        return response;
    }

    // Normaliza texto (remove acentos, lowercase, etc)
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .trim();
    }

    // Encontra melhor resposta baseado em keywords
    findBestResponse(normalizedInput) {
        let bestMatch = null;
        let highestScore = 0;

        // Verifica saudações primeiro
        if (this.isSaudacao(normalizedInput)) {
            return this.getRandomResponse(this.knowledgeBase.saudacao.respostas);
        }

        // Verifica emergência
        if (this.checkEmergency(normalizedInput)) {
            return this.knowledgeBase.emergencia.resposta;
        }

        // Verifica contextos especiais (agradecimento, etc)
        const specialContext = this.checkSpecialContext(normalizedInput);
        if (specialContext) return specialContext;

        // Busca em todas as categorias
        const categories = [
            this.knowledgeBase.regras_gerais,
            this.knowledgeBase.processos,
            this.knowledgeBase.saude_bem_estar,
            this.knowledgeBase.duvidas_frequentes
        ];

        for (const category of categories) {
            for (const key in category) {
                const item = category[key];
                if (item.keywords && item.resposta) {
                    const score = this.calculateMatchScore(normalizedInput, item.keywords);
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = item.resposta;
                    }
                }
            }
        }

        // Verifica contatos úteis
        if (this.knowledgeBase.contatos_uteis.keywords) {
            const score = this.calculateMatchScore(
                normalizedInput, 
                this.knowledgeBase.contatos_uteis.keywords
            );
            if (score > highestScore) {
                return this.knowledgeBase.contatos_uteis.resposta;
            }
        }

        // Se encontrou match razoável
        if (highestScore > 0.3) {
            return bestMatch;
        }

        // Fallback
        return this.getRandomResponse(this.knowledgeBase.fallback.respostas);
    }

    // Calcula score de match baseado em keywords
    calculateMatchScore(input, keywords) {
        let matches = 0;
        const normalizedKeywords = keywords.map(k => this.normalizeText(k));

        for (const keyword of normalizedKeywords) {
            if (input.includes(keyword)) {
                matches++;
            }
        }

        return matches / keywords.length;
    }

    // Verifica se é saudação
    isSaudacao(input) {
        const saudacoes = ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'e ai'];
        return saudacoes.some(s => input.includes(s));
    }

    // Verifica emergência
    checkEmergency(input) {
        if (!this.knowledgeBase.emergencia) return false;
        const emergencyKeywords = this.knowledgeBase.emergencia.keywords.map(k => 
            this.normalizeText(k)
        );
        return emergencyKeywords.some(k => input.includes(k));
    }

    // Verifica contextos especiais
    checkSpecialContext(input) {
        const contexts = this.knowledgeBase.contextos_especiais;
        
        for (const contextKey in contexts) {
            const context = contexts[contextKey];
            const normalized = context.keywords.map(k => this.normalizeText(k));
            
            if (normalized.some(k => input.includes(k))) {
                return context.resposta;
            }
        }
        
        return null;
    }

    // Retorna resposta aleatória de um array
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Limpa histórico
    clearHistory() {
        this.conversationHistory = [];
    }

    // Retorna histórico
    getHistory() {
        return this.conversationHistory;
    }
}

// Instância global
window.liaIA = new LiaIA();

// Função auxiliar para uso fácil
async function askLia(message) {
    return await window.liaIA.processMessage(message);
}
