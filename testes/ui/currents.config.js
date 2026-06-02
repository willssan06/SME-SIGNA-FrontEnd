module.exports = {
  // Project ID — deve corresponder ao projeto criado no Sorry Cypress
  // Para Sorry Cypress local/self-hosted, pode ser qualquer valor
  projectId: process.env.SORRY_CYPRESS_PROJECT_ID || "SME-SIGNA",

  // Record key — pode ser qualquer valor para Sorry Cypress
  recordKey: process.env.SORRY_CYPRESS_RECORD_KEY || "somekey",

  // URL do serviço director do Sorry Cypress (self-hosted)
  cloudServiceUrl: process.env.SORRY_CYPRESS_URL || "http://10.50.1.202:1234",

  // CI Build ID — identificador único para cada execução
  ciBuildId: process.env.CI_BUILD_ID || `local-${Date.now()}`,

  // Paralelização de testes
  parallel: process.env.SORRY_CYPRESS_PARALLEL === 'true' ? true : false,

  // Sempre gravar resultados no Sorry Cypress
  record: true
};