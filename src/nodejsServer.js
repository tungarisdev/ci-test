const express = require('express')
const { exec } = require('child_process')
const path = require('path')

const app = express()
const PORT = 8080

app.use(express.json())

app.post('/deploy', (req, res) => {
  console.log('🚀 Webhook nhan duoc - bat dau chay deploy.bat...')

  const DEPLOY_DIR = __dirname  // Thư mục hiện tại (chính là D:\Java\sprb\ci-test\src)

  exec('deploy.bat', { cwd: DEPLOY_DIR }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Loi khi chay deploy.bat: ${error.message}`)
      return res.status(500).send('Loi khi chay deploy')
    }

    if (stderr) {
      console.warn(`⚠️ stderr:\n${stderr}`)
    }

    console.log(`✅ stdout:\n${stdout}`)
    res.send('Da nhan va chay deploy.bat')
  })
})

app.get('/hello', (req, res) => {
  res.send('✅ Webhook listener dang chay.')
})

app.listen(PORT, () => {
  console.log(`✅ Dang lang nghe webhook tai http://localhost:${PORT}/deploy`)
})
