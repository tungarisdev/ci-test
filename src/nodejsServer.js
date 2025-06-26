const express = require('express')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 8080

let isDeploying = false // Cờ để kiểm tra deploy đang chạy hay không

app.use(express.json())

app.post('/deploy', (req, res) => {
  if (isDeploying) {
    console.log('[INFO] Deploy request received but deployment is already in progress.')
    return res.status(429).send('Deployment already in progress. Please wait.')
  }

  isDeploying = true
  console.log('[INFO] Deployment triggered. Running deploy.bat...')

  const DEPLOY_DIR = __dirname
  const deployBatPath = path.join(DEPLOY_DIR, 'deploy.bat')

  // Chạy deploy.bat trực tiếp (không mở CMD mới) để kiểm soát tiến trình
  exec(`"${deployBatPath}"`, { cwd: DEPLOY_DIR }, (error, stdout, stderr) => {
    isDeploying = false

    if (error) {
      console.error(`[ERROR] Failed to run deploy.bat: ${error.message}`)
      console.error(`[STDERR]\n${stderr}`)
      return res.status(500).send('Error during deployment.')
    }

    console.log('[SUCCESS] deploy.bat executed successfully.')
    console.log(`[STDOUT]\n${stdout}`)
    res.send('Deployment completed successfully.')
  })
})

app.get('/hello', (req, res) => {
  res.send('Webhook listener is running.')
})

app.listen(PORT, () => {
  console.log(`🚀 Listening for webhook at http://localhost:${PORT}/deploy`)
})
