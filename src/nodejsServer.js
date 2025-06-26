const express = require('express')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 8080

app.use(express.json())

app.post('/deploy', (req, res) => {
  console.log('Webhook received - starting deploy.bat via CMD...')

  const DEPLOY_DIR = __dirname // Path to folder containing deploy.bat

  // Use start cmd to run deploy.bat in a new CMD window
  exec('start cmd /c deploy.bat', { cwd: DEPLOY_DIR }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running deploy.bat: ${error.message}`)
      return res.status(500).send('Error running deploy.bat')
    }

    if (stderr) {
      console.warn(`stderr:\n${stderr}`)
    }

    console.log(`CMD started to run deploy.bat`)
    res.send('CMD started and deploy.bat is running')
  })
})

app.get('/hello', (req, res) => {
  res.send('Webhook listener is running.')
})

app.listen(PORT, () => {
  console.log(`Listening for webhook at http://localhost:${PORT}/deploy`)
})
