# 🔄 Sistema em Tempo Real - Lia Care

## Como Funciona

O sistema conecta **colaboradores** e **gestores** automaticamente usando **LocalStorage** como banco de dados compartilhado do navegador.

---

## 🎯 Fluxo de Funcionamento

### 1️⃣ **Colaborador Cadastra Licença**
- Acessa: `tela-05a-confirmacao.html`
- Script `lia-sync.js` cadastra a licença automaticamente
- Dados salvos em `localStorage`

### 2️⃣ **Gestor é Notificado em Tempo Real**
- Painel do gestor (`tela-g1-visao-geral.html`) monitora constantemente
- Notificação aparece instantaneamente
- Estatísticas atualizadas automaticamente
- Badge "NOVA" aparece na licença não visualizada

### 3️⃣ **Atualização Automática**
- Sistema verifica mudanças a cada 5 segundos
- Evento `storage` detecta mudanças de outras abas/janelas
- Notificações persistem até serem visualizadas

---

## 🧪 Como Testar

### **Teste 1: Fluxo Completo**
1. Abra o **Painel do Gestor**: `tela-g1-visao-geral.html`
2. Em outra aba, abra: `tela-05a-confirmacao.html`
3. Volte para o painel do gestor
4. **Resultado**: Notificação aparece automaticamente! 🔔

### **Teste 2: Múltiplas Abas**
1. Abra **2 abas** com `tela-g1-visao-geral.html`
2. Em uma terceira aba, abra `tela-05a-confirmacao.html`
3. **Resultado**: Ambas as abas do gestor atualizam simultaneamente!

### **Teste 3: Persistência**
1. Cadastre uma licença
2. Feche o navegador completamente
3. Abra novamente o painel do gestor
4. **Resultado**: Licença continua lá! (LocalStorage persiste)

---

## 📊 Dados Armazenados

### **Licenças** (`lia_care_licenses`)
```javascript
{
  id: 1735234567890,
  employeeName: "João Silva",
  employeeId: "COL-12345",
  position: "Desenvolvedor Frontend",
  days: 15,
  status: "Aguardando INSS",
  managerViewed: false,  // ← Marca se gestor já viu
  createdAt: "26/12/2025 14:30:00"
}
```

### **Notificações** (`lia_care_notifications`)
```javascript
{
  id: 1735234567890,
  type: "new_license",
  title: "Nova licença cadastrada",
  message: "João Silva cadastrou uma licença de 15 dias",
  read: false,  // ← Marca se foi lida
  timestamp: "2025-12-26T14:30:00.000Z"
}
```

---

## 🎨 Recursos Visuais

### ✅ **Indicadores em Tempo Real**
- 🔔 **Banner de notificação** - Aparece automaticamente
- 🔴 **Badge "NOVA"** - Destaca licenças não visualizadas
- 📊 **Estatísticas dinâmicas** - Atualizam sem refresh
- ✨ **Animação de pulso** - Nos números de pendências

### 🎯 **Ações do Gestor**
- **Ver detalhes** → Marca licença como visualizada
- **Limpar dados** → Reset completo do sistema
- **Simular cadastro** → Teste rápido

---

## 🔧 Arquitetura Técnica

### **lia-sync.js**
- Classe `LiaSync` gerencia todo o sistema
- Métodos principais:
  - `createLicense()` - Cadastra nova licença
  - `notifyManager()` - Cria notificação
  - `getLicenses()` - Busca todas as licenças
  - `getStats()` - Estatísticas em tempo real

### **Eventos Customizados**
```javascript
// Disparado quando há nova notificação
window.addEventListener('lia:newNotification', (e) => {
  console.log(e.detail); // Dados da notificação
});

// Disparado quando dados mudam em outra aba
window.addEventListener('lia:dataUpdated', () => {
  // Atualiza interface
});
```

### **Auto-Refresh**
```javascript
// Verifica mudanças a cada 5 segundos
setInterval(() => {
  if (hasChanges()) {
    updateInterface();
  }
}, 5000);
```

---

## 🚀 Em Produção (Melhorias Futuras)

Este é um **mockup funcional**. Em produção real, usar:

1. **Backend com API REST/GraphQL**
2. **WebSockets** para push em tempo real
3. **Banco de dados** (PostgreSQL, MongoDB)
4. **Autenticação JWT**
5. **Notificações push** (Push API)
6. **Emails automáticos** (Nodemailer)

---

## 📱 Compatibilidade

- ✅ Funciona em todos os navegadores modernos
- ✅ Suporta múltiplas abas/janelas
- ✅ Dados persistem localmente
- ✅ Não requer servidor

---

## 🎉 Demonstração

**Cenário Real:**
1. João Silva (colaborador) quebra o braço
2. Vai ao médico, recebe atestado de 15 dias
3. Chega em casa, acessa Lia Care
4. Cadastra o atestado em 2 minutos
5. **AUTOMATICAMENTE:**
   - ✅ Sistema valida documentos
   - ✅ Gera DUT (Declaração Única de Trabalho)
   - ✅ Notifica gestor Maria Santos
   - ✅ RH é informado
   - ✅ Processo INSS iniciado (se > 15 dias)

6. Maria Santos (gestora) abre o painel
7. **VÊ IMEDIATAMENTE:**
   - 🔔 Notificação: "João Silva cadastrou licença"
   - 📊 Estatísticas atualizadas
   - 📋 Licença na lista com badge "NOVA"

**Resultado:** Zero emails, zero ligações, 100% automático! 🚀

---

## 🔐 Segurança

Em produção, adicionar:
- Criptografia de dados sensíveis
- Controle de acesso por role (colaborador/gestor/RH)
- Logs de auditoria
- HTTPS obrigatório
- Rate limiting

---

**Desenvolvido com ❤️ para AIIALabs + Itaú**
