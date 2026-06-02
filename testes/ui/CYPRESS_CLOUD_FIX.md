# 🔧 Cypress + Currents CLI (Sorry Cypress) - Solução Final

## ✅ O que foi corrigido

1. **Removido plugin incompatível**: O plugin `cypress-cloud/plugin` foi removido do `cypress.config.js` (não suportado no Cypress 13.17.0)
2. **Removido pacote obsoleto**: `cypress-cloud@1.13.1` foi desinstalado (versão antiga descontinuada)
3. **Instalado Currents CLI moderno**: `@currents/cli` (versão atualizada e compatível)
4. **Versões finais instaladas**:
   - ✅ `cypress@13.17.0`
   - ✅ `@currents/cli` (moderna, sem dependências de plugins)

## 📋 Como usar Cypress e Currents agora

### Opção 1: Rodar Cypress normalmente (sem cloud)

```bash
cd testes/ui

# Abrir Cypress UI
npx cypress open

# Rodar testes em modo headless
npx cypress run --browser chrome

# Rodar com Firefox
npx cypress run --browser firefox
```

### Opção 2: Integração com Currents (Sorry Cypress ou Currents.dev)

Use `npx currents` como wrapper do Cypress. Não precisa de plugin!

```bash
cd testes/ui

# Rodar com Currents (sem necessidade de configuração de plugin)
npx currents run --browser chrome

# Rodar em paralelo
npx currents run --parallel --record --browser chrome

# Com variáveis de ambiente do Sorry Cypress
export CURRENTS_PROJECT_ID="SME-SIGNA"
export CURRENTS_RECORD_KEY="somekey"
export CURRENTS_API_URL="http://10.50.1.202:1234"  # Para Sorry Cypress local
npx currents run --browser chrome
```

## 🔗 Configuração de variáveis de ambiente

Crie um arquivo `.env` em `testes/ui/` com:

```env
# Cypress
BASE_URL=https://qa-signa.sme.prefeitura.sp.gov.br
LOGIN_URL=https://qa-signa.sme.prefeitura.sp.gov.br/login
SIGNA_USERNAME=seu_usuario
SIGNA_PASSWORD=sua_senha

# Currents (Sorry Cypress ou Currents.dev)
CURRENTS_PROJECT_ID=SME-SIGNA
CURRENTS_RECORD_KEY=somekey
CURRENTS_API_URL=http://10.50.1.202:1234  # Para Sorry Cypress local
# Para Currents.dev, deixe CURRENTS_API_URL em branco

# API EOL
API_EOL_BASE_URL=https://hom-smeintegracaoapi.sme.prefeitura.sp.gov.br
API_EOL_KEY=sua_chave_api
API_RF_LOGIN=seu_login_rf
API_PASSWORD=sua_senha
API_EMAIL=seu_email
```

## 📝 Scripts npm recomendados

Adicione ao `testes/ui/package.json` scripts como:

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run --browser chrome",
  "cy:run:firefox": "cypress run --browser firefox",
  "currents:run": "currents run --browser chrome",
  "currents:parallel": "currents run --parallel --record --browser chrome"
}
```

## ⚠️ Notas importantes

- **Currents CLI não precisa de plugin** no cypress.config.js
- O arquivo `cypress.config.js` é limpo e sem dependências de plugins não-oficiais
- `cypress-cloud` foi removido (pacote obsoleto)
- `@currents/cli` é o novo padrão para integração com Currents.dev e Sorry Cypress
- Para Sorry Cypress local, configure `CURRENTS_API_URL=http://10.50.1.202:1234`
- Para Currents.dev (cloud), use o `CURRENTS_RECORD_KEY` e deixe a URL padrão

## 🚀 Como integrar com Jenkins (CI/CD)

No Jenkinsfile, use:

```groovy
stage('E2E Tests - Currents') {
    steps {
        sh '''
            cd testes/ui
            export CURRENTS_PROJECT_ID="SME-SIGNA"
            export CURRENTS_RECORD_KEY="${CURRENTS_RECORD_KEY}"
            export CURRENTS_API_URL="http://10.50.1.202:1234"
            npx currents run --parallel --record --browser chrome
        '''
    }
}
```

Ou para Currents.dev:

```groovy
stage('E2E Tests - Currents Cloud') {
    steps {
        sh '''
            cd testes/ui
            export CURRENTS_PROJECT_ID="your-project-id"
            export CURRENTS_RECORD_KEY="${CURRENTS_RECORD_KEY}"
            npx currents run --parallel --record --browser chrome
        '''
    }
}
```

## 🎯 Próximos passos

1. Instale as dependências: `npm install`
2. Configure o arquivo `.env` com suas credenciais
3. Teste localmente: `npm run cy:run`
4. Para Currents: `npm run currents:run`
5. Para CI/CD, configure as variáveis de ambiente no Jenkins

