// ============================================
// BASE DE CONHECIMENTO - LIA CARE
// ============================================
// Informações aprovadas para a IA usar
// Atualizado por: Equipe Médica Corporativa

const KNOWLEDGE_BASE = {
  // Condições comuns e orientações gerais
  conditions: {
    lombalgia: {
      name: 'Lombalgia (Dor nas Costas)',
      generalTips: [
        '🛏️ Repouso moderado: evite ficar completamente parado, movimente-se suavemente',
        '❄️ Compressas: gelo nas primeiras 48h, depois calor',
        '🧘 Alongamentos leves após melhora da dor aguda',
        '💊 Siga a medicação prescrita pelo médico',
        '🪑 Mantenha postura correta ao sentar'
      ],
      exercises: [
        'Caminhadas leves (5-10min) se não houver dor',
        'Alongamento de gato-vaca (yoga)',
        'Exercício de ponte (glúteos)',
        'Joelhos ao peito (alongamento lombar)'
      ],
      warnings: [
        'Evite carregar peso',
        'Não faça movimentos bruscos',
        'Evite ficar muito tempo na mesma posição'
      ]
    },

    tendinite: {
      name: 'Tendinite',
      generalTips: [
        '❄️ Gelo no local 3-4x ao dia (15-20min)',
        '🛑 Repouso da articulação afetada',
        '💊 Anti-inflamatórios conforme prescrição médica',
        '🔄 Movimentos suaves para evitar rigidez',
        '⏰ Respeite o tempo de recuperação'
      ],
      exercises: [
        'Alongamentos suaves após fase aguda',
        'Fortalecimento gradual com orientação fisioterápica',
        'Movimentos circulares leves da articulação'
      ],
      warnings: [
        'Evite movimentos repetitivos',
        'Não force a articulação',
        'Aguarde liberação médica para retornar ao trabalho'
      ]
    },

    ansiedade: {
      name: 'Ansiedade / Estresse',
      generalTips: [
        '🧘 Pratique respiração profunda (4-7-8)',
        '🌳 Contato com natureza e luz solar',
        '💤 Mantenha rotina de sono regular',
        '🏃 Exercícios físicos moderados',
        '📱 Limite uso de redes sociais',
        '🗣️ Converse com pessoas de confiança'
      ],
      exercises: [
        'Meditação guiada (apps: Headspace, Calm)',
        'Caminhada ao ar livre 30min/dia',
        'Yoga ou pilates',
        'Exercícios aeróbicos leves'
      ],
      warnings: [
        'Procure psicólogo/psiquiatra se sintomas persistirem',
        'Não interrompa medicação sem orientação médica',
        'Evite automedicação'
      ]
    },

    fratura: {
      name: 'Fratura',
      generalTips: [
        '🦴 Siga rigorosamente orientações ortopédicas',
        '🥛 Alimentação rica em cálcio e vitamina D',
        '💊 Tome medicação para dor conforme prescrito',
        '🚫 Não force o membro afetado',
        '🩹 Mantenha imobilização conforme orientação'
      ],
      exercises: [
        'Apenas movimentos liberados pelo ortopedista',
        'Fisioterapia conforme prescrição',
        'Fortalecimento de outras áreas do corpo'
      ],
      warnings: [
        'NUNCA remova imobilização sem autorização médica',
        'Observe sinais de complicação (dormência, cor roxa)',
        'Retorne ao médico conforme agendado'
      ]
    },

    covid: {
      name: 'COVID-19 / Síndrome Gripal',
      generalTips: [
        '💧 Hidratação abundante (2-3L água/dia)',
        '🌡️ Controle febre com medicação prescrita',
        '😷 Isolamento conforme orientação médica',
        '🛏️ Repouso adequado',
        '🍲 Alimentação leve e nutritiva',
        '📊 Monitore saturação de oxigênio se tiver oxímetro'
      ],
      exercises: [
        'Repouso na fase aguda',
        'Caminhadas muito leves após melhora',
        'Evite esforço físico intenso por 2 semanas após recuperação'
      ],
      warnings: [
        'Procure emergência se: falta de ar, febre persistente, confusão mental',
        'Não se automedique com antibióticos',
        'Respeite tempo de isolamento'
      ]
    }
  },

  // Dicas gerais de recuperação
  generalWellness: {
    nutrition: [
      '🥗 Alimentação equilibrada rica em frutas e vegetais',
      '🐟 Proteínas magras (peixe, frango, ovos)',
      '🌾 Grãos integrais para energia',
      '💧 Hidratação: mínimo 2L água/dia',
      '🚫 Evite: álcool, excesso de açúcar, alimentos processados',
      '☕ Limite cafeína se tiver ansiedade'
    ],

    sleep: [
      '😴 Durma 7-9 horas por noite',
      '⏰ Mantenha horários regulares',
      '📱 Desligue telas 1h antes de dormir',
      '🌡️ Quarto fresco e escuro',
      '🛏️ Colchão e travesseiro adequados'
    ],

    mentalHealth: [
      '🧠 Reserve tempo para hobbies',
      '👥 Mantenha contato social (virtual se necessário)',
      '📝 Journaling - escreva sobre sentimentos',
      '🎵 Música relaxante',
      '📚 Leitura leve',
      '🙏 Pratique gratidão diária'
    ],

    ergonomics: [
      '🪑 Cadeira com apoio lombar',
      '💻 Tela na altura dos olhos',
      '⌨️ Pulsos alinhados ao digitar',
      '👣 Pés apoiados no chão',
      '⏱️ Pausas a cada 50min',
      '🧘 Alongue-se durante pausas'
    ]
  },

  // Emergências - quando orientar a buscar ajuda imediata
  emergencySigns: [
    'Dor no peito ou falta de ar severa',
    'Dor de cabeça súbita e intensa',
    'Febre muito alta (>39.5°C) que não baixa',
    'Confusão mental ou desorientação',
    'Sangramento que não para',
    'Dor abdominal intensa',
    'Pensamentos suicidas',
    'Reação alérgica grave'
  ],

  // Disclaimers importantes
  disclaimers: {
    general: 'Estas são orientações gerais de bem-estar. Sempre siga as orientações específicas do seu médico.',
    notMedicalAdvice: 'Não sou médica e não posso fazer diagnósticos ou prescrever tratamentos.',
    emergency: 'Em caso de emergência, ligue 192 (SAMU) ou procure o pronto-socorro.',
    privacy: 'Suas informações são privadas e protegidas pela LGPD.'
  }
};

// Função auxiliar para buscar informações
function getConditionInfo(conditionName) {
  const normalized = conditionName.toLowerCase().trim();
  
  // Mapeamento de termos comuns
  const conditionMap = {
    'lombalgia': 'lombalgia',
    'dor nas costas': 'lombalgia',
    'dor coluna': 'lombalgia',
    'tendinite': 'tendinite',
    'tendinite ombro': 'tendinite',
    'tendinite pulso': 'tendinite',
    'ansiedade': 'ansiedade',
    'estresse': 'ansiedade',
    'depressão': 'ansiedade',
    'fratura': 'fratura',
    'osso quebrado': 'fratura',
    'covid': 'covid',
    'gripe': 'covid',
    'coronavirus': 'covid'
  };

  const key = conditionMap[normalized];
  return key ? KNOWLEDGE_BASE.conditions[key] : null;
}

// Contexto adicional baseado na condição do usuário
function buildContextPrompt(userCondition) {
  const info = getConditionInfo(userCondition);
  
  if (!info) {
    return `O colaborador está em licença médica. Forneça orientações gerais de bem-estar.`;
  }

  return `O colaborador está em licença médica por: ${info.name}

DICAS APROVADAS PARA ESTA CONDIÇÃO:
${info.generalTips.join('\n')}

EXERCÍCIOS RECOMENDADOS:
${info.exercises.join('\n')}

ALERTAS IMPORTANTES:
${info.warnings.join('\n')}

Use estas informações para personalizar sua resposta, mas sempre reforce que são orientações gerais.`;
}

module.exports = {
  KNOWLEDGE_BASE,
  getConditionInfo,
  buildContextPrompt
};
