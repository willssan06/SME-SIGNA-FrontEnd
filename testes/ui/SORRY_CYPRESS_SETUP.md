# 🛠️ Setup Sorry Cypress para SME-SIGNA

Este projeto agora está configurado para usar **Sorry Cypress**, uma solução self-hosted gratuita e open-source para gravação e paralelização de testes Cypress.

## 📋 Pré-requisitos

- Docker & Docker Compose
- Acesso ao servidor de CI/CD (Jenkins)

## 🚀 Deploy do Sorry Cypress

### Opção 1: Docker Local (para teste)

```bash
# Clone o repositório Sorry Cypress
git clone https://github.com/sorry-cypress/sorry-cypress.git
cd sorry-cypress

# Execute com docker-compose
docker-compose up
```

O serviço estará disponível em: `http://localhost:3000`

### Opção 2: Deploy em Kubernetes (produção)

```bash
helm repo add sorry-cypress https://charts.sorry-cypress.dev
helm install sorry-cypress sorry-cypress/sorry-cypress
```

### Opção 3: Docker Swarm

```bash
docker stack deploy -c docker-compose.yml sorry-cypress
```

---

## ⚙️ Configuração do Projeto

### 1. Variáveis de Ambiente no Jenkins

Configure os seguintes secrets no Jenkins:

```groovy
SORRY_CYPRESS_URL          = "http://10.50.1.202:1234"  // URL do director service
SORRY_CYPRESS_PROJECT_ID   = "SME-SIGNA"                 // Project ID
SORRY_CYPRESS_RECORD_KEY   = "somekey"                   // Record key (qualquer valor para self-hosted)
CI_BUILD_ID                = "${env.BUILD_NUMBER}"       // Build ID do Jenkins
```

### 2. Arquivo: `currents.config.js` ✅

Já está configurado para ler variáveis de ambiente:

```javascript
cloudServiceUrl: process.env.SORRY_CYPRESS_URL || "http://10.50.1.202:1234",
projectId: process.env.SORRY_CYPRESS_PROJECT_ID || "SME-SIGNA",
recordKey: process.env.SORRY_CYPRESS_RECORD_KEY || "somekey",
```

### 3. Arquivo: `cypress.config.js` ✅

Já está importando o cloudPlugin:

```javascript
const { cloudPlugin } = require('cypress-cloud/plugin');
const currentsConfig = require('./currents.config.js');

// No setupNodeEvents:
await cloudPlugin(on, mergedConfig);
```

---

## 🧪 Testando Localmente

```bash
# Instalar dependências
cd testes/ui
npm install

# Rodar com Sorry Cypress (local)
export SORRY_CYPRESS_URL=http://localhost:3000
npx cypress-cloud run --parallel --record --browser chrome
```

---

## 📊 Acessar Dashboard

Após executar os testes:

1. Acesse: `http://<seu-servidor>:3000`
2. Procure pelo projeto "SME-SIGNA"
3. Clique na run mais recente
4. Veja vídeos, screenshots e logs

---

## 🔧 Troubleshooting

### "cypress-cloud plugin not supported"

✅ **Resolvido!** O cypress-cloud agora está configurado para Sorry Cypress, não para Cypress Cloud oficial.

### Conexão recusada ao Sorry Cypress

Verifique:
1. Sorry Cypress está rodando? `docker ps`
2. URL correta em `currents.config.js`?
3. Firewall/rede permite acesso?

### Testes não aparecem no dashboard

1. Verifique logs: `docker logs <container-id>`
2. Confirme `--record` está na linha de comando
3. Confirme `--ci-build-id` tem valor válido

---

## 📚 Referências

- [Sorry Cypress Docs](https://sorry-cypress.dev)
- [Cypress Cloud Plugin](https://github.com/sorry-cypress/cypress-cloud)
- [Docker Compose](https://sorry-cypress.dev/guide/docker)

---

## ✨ Próximos Passos

1. ✅ Instalar Sorry Cypress
2. ✅ Configurar variáveis de ambiente no Jenkins
3. ✅ Rodar primeira build com `npx cypress-cloud run --record`
4. ✅ Acessar dashboard e validar
