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
                'js/knowledge-base-financeiro.json',
                'js/knowledge-base-ia-gestao.json'
            ];

            // Cache busting - força recarregar sempre
            const timestamp = new Date().getTime();
            console.log('🔄 Carregando bases de conhecimento... (v' + timestamp + ')');
            
            const promises = bases.map(url => 
                fetch(url + '?v=' + timestamp)
                    .then(res => res.json())
                    .catch(err => {
                        console.warn(`⚠️ Erro ao carregar ${url}:`, err);
                        return {};
                    })
            );

            const results = await Promise.all(promises);
            
            // Mescla todas as bases em uma única
            this.knowledgeBase = {};
            results.forEach((base, index) => {
                console.log(`📦 Base ${index + 1}:`, Object.keys(base));
                this.knowledgeBase = { ...this.knowledgeBase, ...base };
            });

            const totalTopics = Object.keys(this.knowledgeBase).length;
            console.log(`✅ ${bases.length} bases carregadas com ${totalTopics} tópicos!`);
            console.log('📚 Categorias:', Object.keys(this.knowledgeBase));
            console.log('🔍 Exemplo de tópico:', this.knowledgeBase[Object.keys(this.knowledgeBase)[0]]);
            
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
        // Espera bases carregarem se necessário
        let tentativas = 0;
        while (!this.knowledgeBase && tentativas < 10) {
            console.log('⏳ Aguardando bases de conhecimento...');
            await new Promise(resolve => setTimeout(resolve, 500));
            tentativas++;
        }
        
        if (!this.knowledgeBase || Object.keys(this.knowledgeBase).length === 0) {
            console.error('❌ Bases não carregadas!');
            return 'Desculpe, estou com dificuldades para carregar minha base de conhecimento. Tente recarregar a página (F5).';
        }

        // Adiciona ao histórico
        this.conversationHistory.push({
            role: 'user',
            message: userMessage,
            timestamp: new Date()
        });

        // Normaliza entrada
        const normalizedInput = this.normalizeText(userMessage);
        console.log('🔍 Input normalizado:', normalizedInput);

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

        // 1. CONVERSAS CASUAIS E PERGUNTAS BÁSICAS
        const casualResponse = this.handleCasualConversation(normalizedInput);
        if (casualResponse) return casualResponse;

        // 2. Verifica saudações
        if (this.isSaudacao(normalizedInput)) {
            if (this.knowledgeBase.saudacao && this.knowledgeBase.saudacao.respostas) {
                return this.getRandomResponse(this.knowledgeBase.saudacao.respostas);
            }
        }

        // 3. Verifica emergência
        if (this.checkEmergency(normalizedInput)) {
            if (this.knowledgeBase.emergencia) {
                return this.knowledgeBase.emergencia.resposta;
            }
        }

        // 4. Verifica contextos especiais (agradecimento, etc)
        const specialContext = this.checkSpecialContext(normalizedInput);
        if (specialContext) return specialContext;

        // 5. Busca em TODOS os tópicos da base de conhecimento
        for (const topicKey in this.knowledgeBase) {
            const topic = this.knowledgeBase[topicKey];
            
            // Pula tópicos especiais
            if (['saudacao', 'fallback', 'emergencia', 'agradecimento'].includes(topicKey)) {
                continue;
            }
            
            // Se tem keywords e resposta
            if (topic.keywords && topic.resposta) {
                const score = this.calculateMatchScore(normalizedInput, topic.keywords);
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = topic.resposta;
                    console.log(`🎯 Match encontrado: ${topicKey} (score: ${score})`);
                }
            }
        }

        // Se encontrou match razoável
        if (highestScore > 0) {
            console.log(`✅ Match final com score ${highestScore}`);
            return bestMatch;
        }

        // Fallback
        console.log('❌ Nenhum match encontrado, usando fallback');
        return this.getRandomResponse(this.knowledgeBase.fallback.respostas);
    }
    
    // Nova função: Respostas para conversas casuais e perguntas básicas
    handleCasualConversation(input) {
        // Como você está / tudo bem
        if (input.includes('como voce esta') || input.includes('como vc esta') || 
            input.includes('como vai') || input.includes('tudo bem')) {
            const responses = [
                'Estou ótima, obrigada por perguntar! 😊 Como posso te ajudar com sua licença médica?',
                'Tudo bem por aqui! Pronta para te ajudar. O que você precisa saber?',
                'Indo bem! E você, como está? Está tudo certo com sua licença?'
            ];
            return this.getRandomResponse(responses);
        }
        
        // Quem é você / o que você faz
        if (input.includes('quem e voce') || input.includes('quem e vc') || 
            input.includes('o que voce faz') || input.includes('para que serve')) {
            return 'Eu sou a LIA, sua assistente inteligente para gestão de licenças médicas! 🤖 Estou aqui para te guiar em todo o processo de afastamento: cadastro de atestados, orientações sobre INSS, acompanhamento de prazos e dicas de saúde. Como posso te ajudar hoje?';
        }
        
        // Qual seu nome
        if (input.includes('qual seu nome') || input.includes('seu nome')) {
            return 'Meu nome é LIA - Licenças e Inteligência em Ação! 😊 Prazer em te conhecer! Estou aqui para tornar sua licença médica mais simples e tranquila.';
        }
        
        // Tchau / até logo
        if (input.includes('tchau') || input.includes('ate logo') || 
            input.includes('ate mais') || input.includes('flw')) {
            const responses = [
                'Até logo! Qualquer dúvida, é só me chamar. Cuide-se! 💙',
                'Tchau! Boa recuperação e conte comigo sempre que precisar! 😊',
                'Até mais! Estou aqui 24/7 quando você precisar. Melhoras! 🏥'
            ];
            return this.getRandomResponse(responses);
        }
        
        // Está funcionando / você funciona
        if (input.includes('funciona') || input.includes('funcionando')) {
            return 'Sim, estou funcionando perfeitamente! ✅ Pronta para te ajudar com suas dúvidas sobre licenças médicas. O que você gostaria de saber?';
        }
        
        // Pode me ajudar
        if (input.includes('pode me ajudar') || input.includes('preciso de ajuda')) {
            return 'Claro que posso te ajudar! 😊 Sou especialista em licenças médicas. Você pode me perguntar sobre:\n\n• Como cadastrar seu atestado\n• Quando acionar o INSS\n• Prazos e documentação\n• Seus direitos trabalhistas\n• Dicas de saúde e recuperação\n\nSobre o que você tem dúvida?';
        }
        
        // Você é uma IA / robô
        if (input.includes('voce e ia') || input.includes('voce e robo') || 
            input.includes('voce e um bot')) {
            return 'Sou uma assistente virtual inteligente! 🤖 Fui programada para te ajudar com licenças médicas de forma rápida e precisa. Mesmo sendo uma IA, estou aqui para facilitar sua vida de verdade! Como posso te ajudar?';
        }
        
        // Qual a data / que dia é hoje
        if (input.includes('que dia') || input.includes('qual a data') || 
            input.includes('que data')) {
            const hoje = new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            return `Hoje é ${hoje}. Posso te ajudar com alguma questão sobre prazos de licença?`;
        }
        
        // Que horas são
        if (input.includes('que horas') || input.includes('qual a hora')) {
            const agora = new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            return `São ${agora}. Precisa de ajuda com sua licença médica?`;
        }
        
        // Legal / bacana / show
        if (input === 'legal' || input === 'bacana' || input === 'show' || 
            input === 'massa' || input === 'top') {
            const responses = [
                'Que bom que gostou! 😊 Tem mais alguma dúvida?',
                'Fico feliz em ajudar! Precisa de mais alguma coisa?',
                'Obrigada! Estou aqui para o que precisar! 💙'
            ];
            return this.getRandomResponse(responses);
        }
        
        // Entendi / ok / certo
        if (input === 'entendi' || input === 'ok' || input === 'certo' || 
            input === 'beleza' || input === 'ta bom') {
            const responses = [
                'Ótimo! Alguma outra dúvida?',
                'Que bom! Posso te ajudar com mais alguma coisa?',
                'Perfeito! Estou aqui se precisar de mais alguma informação.'
            ];
            return this.getRandomResponse(responses);
        }
        
        return null; // Não é conversa casual, continua para busca na base de conhecimento
    }

    // Calcula score de match baseado em keywords
    calculateMatchScore(input, keywords) {
        let matches = 0;
        const normalizedKeywords = keywords.map(k => this.normalizeText(k));

        for (const keyword of normalizedKeywords) {
            // Match exato
            if (input.includes(keyword)) {
                matches += 1;
            } 
            // Match parcial (pelo menos 50% das palavras)
            else {
                const keywordWords = keyword.split(' ');
                const matchedWords = keywordWords.filter(word => 
                    word.length > 2 && input.includes(word)
                );
                if (matchedWords.length >= keywordWords.length * 0.5) {
                    matches += 0.5;
                }
            }
        }

        const score = matches / keywords.length;
        return score;
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
        // Verifica agradecimento
        if (this.knowledgeBase.agradecimento && this.knowledgeBase.agradecimento.keywords) {
            const normalized = this.knowledgeBase.agradecimento.keywords.map(k => this.normalizeText(k));
            if (normalized.some(k => input.includes(k))) {
                return this.knowledgeBase.agradecimento.resposta;
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
