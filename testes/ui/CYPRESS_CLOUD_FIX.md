# 🔧 Correção do Cypress Cloud - Status Atual

## ✅ O que foi corrigido

1. **Removido plugin incompatível**: O plugin `cypress-cloud/plugin` foi removido do `cypress.config.js` pois não é suportado nativamente pelo Cypress 13.17.0
2. **Versões instaladas e compatíveis**:
   - `cypress@13.17.0` ✓
   - `cypress-cloud@1.13.1` ✓

## 📋 Como usar Cypress com Sorry Cypress agora

### Opção 1: Rodar Cypress normalmente (sem integração com Sorry Cypress)

```bash
cd testes/ui

# Abrir Cypress UI
npx cypress open

# Rodar testes em modo headless
npx cypress run --browser chrome

# Rodar com Firefox
npx cypress run --browser firefox
```

### Opção 2: Integração com Sorry Cypress via CLI (cypress-cloud)

Para integrar com Sorry Cypress, use `cypress-cloud` como wrapper do CLI:

```bash
cd testes/ui

# Rodar com cypress-cloud (substitui 'cypress' por 'cypress-cloud')
npx cypress-cloud run --browser chrome

# Rodar em paralelo
npx cypress-cloud run --parallel --record --browser chrome

# Com variáveis de ambiente do Sorry Cypress
export SORRY_CYPRESS_PROJECT_ID="SME-SIGNA"
export SORRY_CYPRESS_RECORD_KEY="somekey"
export SORRY_CYPRESS_URL="http://10.50.1.202:1234"
npx cypress-cloud run --browser chrome
```

## 🔗 Configuração de variáveis de ambiente

Crie um arquivo `.env` em `testes/ui/` com:

```env
# Cypress
BASE_URL=https://qa-signa.sme.prefeitura.sp.gov.br
LOGIN_URL=https://qa-signa.sme.prefeitura.sp.gov.br/login
SIGNA_USERNAME=seu_usuario
SIGNA_PASSWORD=sua_senha

# Sorry Cypress (opcional)
SORRY_CYPRESS_PROJECT_ID=SME-SIGNA
SORRY_CYPRESS_RECORD_KEY=somekey
SORRY_CYPRESS_URL=http://10.50.1.202:1234
SORRY_CYPRESS_PARALLEL=false

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
  "cy:cloud:run": "cypress-cloud run --browser chrome",
  "cy:cloud:parallel": "cypress-cloud run --parallel --record --browser chrome"
}
```

## ⚠️ Notas importantes

- O arquivo `currents.config.js` continua sendo usado apenas se você rodar via `cypress-cloud`
- Para CI/CD (Jenkins), use o comando `npx cypress-cloud run` para integração com Sorry Cypress
- O arquivo `cypress.config.js` agora é limpo e sem dependências de plugins não-oficiais
- Se precisar de funcionalidades do plugin no futuro, considere atualizar para Cypress 15+ com suporte nativo

## 🚀 Próximos passos

1. Instale as dependências se necessário: `npm install`
2. Teste localmente: `npm run cy:run`
3. Para CI/CD, configure as variáveis de ambiente do Sorry Cypress no Jenkins
4. Execute: `npm run cy:cloud:run` em seu pipeline
