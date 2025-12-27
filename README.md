# 🏥 Lia Care - Sistema de Licenças e Afastamentos

Sistema corporativo inteligente para gestão de licenças médicas com IA integrada e sincronização em tempo real.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

---

## 🌐 **[ACESSE O SITE ONLINE](https://SEU-USUARIO.github.io/lia-care)**

> Substitua SEU-USUARIO pelo seu nome de usuário do GitHub após fazer o deploy

---

## 🚀 INÍCIO RÁPIDO

### Windows (Automático)

```batch
1. Dê duplo clique em: CONFIGURAR.bat
2. Edite backend-example\.env e adicione sua chave OpenAI (opcional)
3. Dê duplo clique em: INICIAR-SERVIDOR.bat
4. Abra index.html no navegador
```

### Manual

```bash
# 1. Instalar dependências
cd backend-example
npm install

# 2. Configurar (opcional - para IA)
cp .env.example .env
# Edite .env: OPENAI_API_KEY=sk-proj-sua-chave

# 3. Iniciar servidor
npm run dev

# 4. Abrir no navegador
Abra: index.html
```

---

## ✨ Funcionalidades

- ✅ **Cadastro de Licenças** (< 15 dias e ≥ 15 dias)
- 🤖 **Assistente IA** com dicas de saúde personalizadas
- 👔 **Dashboard Gestor** com visão da equipe
- 📊 **Acompanhamento** em tempo real
- ❓ **FAQ Completo** com todas as regras
- 📱 **Design Responsivo** (mobile, tablet, desktop)

---

## 📋 Estrutura

```
Lia Care/
├── index.html                 # 🏠 Página inicial
├── CONFIGURAR.bat            # ⚙️ Script de setup
├── INICIAR-SERVIDOR.bat      # 🚀 Iniciar servidor
│
├── Fluxo Colaborador (18 telas):
│   ├── tela-01-entrada.html
│   ├── tela-02-identificacao.html
│   ├── tela-03-diagnostico.html
│   ├── ... (cenários INSS)
│   └── tela-06b-decisao.html
│
├── Fluxo Gestor (3 telas):
│   ├── tela-g1-visao-geral.html
│   ├── tela-g2-notificacao.html
│   └── tela-g3-detalhe.html
│
├── Recursos IA:
│   ├── tela-dicas-saude.html
│   ├── guia-integracao-ia.html
│   └── backend-example/
│
└── Documentação:
    ├── README.md (este arquivo)
    ├── README-IA.md
    └── tela-ajuda-duvidas.html
```

---

## 🤖 Integração IA (Opcional)

### Como Obter Chave OpenAI

1. Acesse: https://platform.openai.com/
2. Faça login → API Keys → Create new key
3. Copie a chave (sk-proj-...)
4. Cole em `backend-example\.env`

### Custo

- **Modelo**: GPT-4o-mini
- **Preço**: ~$0.01 por conversa
- **Exemplo**: 1000 colaboradores × 2 usos/mês = $20/mês

### Funciona Sem IA?

**SIM!** Sistema tem fallback com respostas pré-programadas.

---

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| [README-IA.md](README-IA.md) | Guia completo de integração IA |
| [backend-example/README.md](backend-example/README.md) | Docs do servidor |
| [guia-integracao-ia.html](guia-integracao-ia.html) | Tutorial visual interativo |
| [tela-ajuda-duvidas.html](tela-ajuda-duvidas.html) | FAQ do sistema |

---

## 🔒 Segurança

- ✅ Chave API em .env (não versionada)
- ✅ Rate limiting (50 req/15min)
- ✅ CORS configurado
- ✅ Validação de inputs
- ✅ Error handling

---

## ❓ Problemas?

### Servidor não inicia

```bash
node --version  # Verifica Node.js
cd backend-example
npm install     # Reinstala dependências
```

### API não funciona

```bash
# Verifica configuração
cat backend-example\.env

# Funciona sem IA usando fallback!
```

---

## 📞 Suporte

- 📖 Leia [guia-integracao-ia.html](guia-integracao-ia.html)
- ❓ Consulte [tela-ajuda-duvidas.html](tela-ajuda-duvidas.html)
- 🔧 Verifique logs do servidor

---

## 🎯 Status

✅ **100% Funcional**
- 23 telas implementadas
- IA integrada com OpenAI
- Backend seguro
- Documentação completa
- Scripts de configuração

---

**Desenvolvido com ❤️ | MIT License**

🚀 **Comece agora:** Execute `CONFIGURAR.bat` e abra `index.html`
