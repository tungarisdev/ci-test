const express = require('express')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 8080

let isDeploying = false // Flag to prevent duplicate runs

app.use(express.json())

app.post('/deploy', (req, res) => {
  if (isDeploying) {
    console.log('[INFO] Deploy request rejected: deploy.bat is already running.')
    return res.status(429).send('Deploy is already in progress. Please try again later.')
  }

  isDeploying = true
  console.log('[INFO] Starting CMD to run deploy.bat...')

  const DEPLOY_DIR = __dirname

  // Open a new CMD window and run deploy.bat
  exec('start cmd /c deploy.bat', { cwd: DEPLOY_DIR }, (error, stdout, stderr) => {
    console.log('[INFO] CMD window started to run deploy.bat.')
    res.send('CMD started and deploy.bat is running.')

    // Reset the flag after an estimated duration
    setTimeout(() => {
      isDeploying = false
      console.log('[INFO] Reset isDeploying flag (after timeout)')
    }, 60 * 1000) // 60 seconds (adjust as needed)
  })
})

app.get('/hello', (req, res) => {
  res.send('Webhook listener is running.')
})

app.listen(PORT, () => {
  console.log(`Listening for webhook at http://localhost:${PORT}/deploy`)
})
