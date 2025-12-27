# 🚀 Guia de Deploy - Lia Care no GitHub Pages

## Passo a Passo Completo

### 1️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. **Repository name**: `lia-care`
3. **Description**: `Sistema inteligente de gestão de licenças médicas com IA`
4. Deixe como **Public** (para usar GitHub Pages gratuito)
5. **NÃO** marque "Add a README" (já temos)
6. Clique em **"Create repository"**

---

### 2️⃣ Conectar Repositório Local ao GitHub

No terminal (PowerShell), execute os comandos fornecidos pelo GitHub:

```powershell
cd "c:\Users\USER\OneDrive\Desktop\Lia Care"

# Substitua SEU-USUARIO pelo seu nome de usuário do GitHub
git remote add origin https://github.com/SEU-USUARIO/lia-care.git

# Renomeia branch para main (padrão atual do GitHub)
git branch -M main

# Envia código para o GitHub
git push -u origin main
```

**Se pedir autenticação:**
- Use seu **Personal Access Token** (não a senha)
- Gere em: https://github.com/settings/tokens
  - Marque: `repo` (Full control of private repositories)
  - Copie o token gerado (só aparece uma vez!)

---

### 3️⃣ Ativar GitHub Pages

1. No repositório, vá em **Settings** (Configurações)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. Clique em **Save**
5. Aguarde alguns minutos ⏳

**Site ficará disponível em:**
```
https://SEU-USUARIO.github.io/lia-care
```

---

### 4️⃣ Verificar Deploy

Após 2-5 minutos, acesse:
```
https://SEU-USUARIO.github.io/lia-care
```

✅ **Pronto! Seu site está no ar!** 🎉

---

## 🔄 Atualizando o Site

Sempre que fizer alterações:

```powershell
cd "c:\Users\USER\OneDrive\Desktop\Lia Care"

# Ver mudanças
git status

# Adicionar arquivos modificados
git add .

# Criar commit
git commit -m "📝 Descrição das mudanças"

# Enviar para GitHub
git push
```

**Aguarde 1-2 minutos** e as mudanças estarão online automaticamente!

---

## 📊 Comandos Git Úteis

### Ver histórico
```bash
git log --oneline --graph
```

### Ver status
```bash
git status
```

### Desfazer mudanças não commitadas
```bash
git checkout -- arquivo.html
```

### Ver diferenças
```bash
git diff
```

### Criar nova branch
```bash
git checkout -b nova-funcionalidade
```

### Voltar para main
```bash
git checkout main
```

### Mesclar branch
```bash
git checkout main
git merge nova-funcionalidade
```

---

## 🎨 Personalizando README no GitHub

Edite `README.md` e substitua:
- `SEU-USUARIO` → Seu nome de usuário real
- Adicione screenshots (veja seção abaixo)
- Personalize descrição

---

## 📸 Adicionando Screenshots

1. Tire prints das telas principais
2. Crie pasta `screenshots/` no projeto
3. Adicione as imagens
4. No README.md, adicione:

```markdown
## 📱 Screenshots

### Colaborador
![Tela Inicial](screenshots/tela-inicial.png)
![Chat IA](screenshots/chat-ia.png)

### Gestor
![Painel](screenshots/painel-gestor.png)
```

5. Commit e push:
```bash
git add screenshots/
git commit -m "📸 Adiciona screenshots"
git push
```

---

## 🌐 Domínio Personalizado (Opcional)

Se você tem um domínio próprio (ex: `liacare.com.br`):

1. Vá em **Settings → Pages**
2. Em **Custom domain**, digite: `liacare.com.br`
3. No seu provedor de domínio (Registro.br, GoDaddy, etc):
   - Adicione registro **CNAME** apontando para `SEU-USUARIO.github.io`
   - Ou registro **A** apontando para IPs do GitHub:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

4. Aguarde propagação DNS (até 24h)
5. Marque **"Enforce HTTPS"** no GitHub

---

## 🔧 Troubleshooting

### Erro 404 ao acessar site
- Aguarde 5 minutos após ativar Pages
- Verifique se branch está como `main`
- Confirme que `index.html` está na raiz

### Mudanças não aparecem
- Aguarde 1-2 minutos (cache do GitHub)
- Force refresh: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
- Limpe cache do navegador

### Erro de autenticação no push
- Use Personal Access Token, não senha
- Gere novo token em: https://github.com/settings/tokens
- Use HTTPS, não SSH (mais simples)

### Site carrega mas CSS não funciona
- Verifique se caminhos em `<link>` e `<script>` são relativos
- Exemplo correto: `css/style.css` (sem `/` no início)

---

## 📈 Próximos Passos

Após hospedar:

1. ⭐ **Estrele o repositório** (seu próprio projeto!)
2. 📝 **Adicione descrição** no GitHub
3. 🏷️ **Adicione topics**: `healthcare`, `ai`, `javascript`, `html-css`
4. 📊 **Habilite Issues** para feedback
5. 🌍 **Compartilhe o link**!

---

## 🎉 Parabéns!

Seu sistema Lia Care está:
- ✅ Versionado com Git
- ✅ Hospedado gratuitamente
- ✅ Acessível de qualquer lugar
- ✅ Com HTTPS automático
- ✅ Deploy automático a cada push

**Link final:**
```
https://SEU-USUARIO.github.io/lia-care
```

---

## 💡 Dicas Extras

### Badge de status no README
Adicione ao `README.md`:
```markdown
![GitHub Pages](https://github.com/SEU-USUARIO/lia-care/actions/workflows/pages/pages-build-deployment/badge.svg)
```

### Analytics (opcional)
Adicione Google Analytics no `index.html`:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

**Desenvolvido com ❤️ para AIIALabs**
