const express = require('express')
const { exec } = require('child_process')

const app = express()
const PORT = 8081

app.use(express.json())

// Optional: Kiểm tra token bảo mật nếu bạn dùng Bearer Authorization
// const AUTH_TOKEN = 'your-secret-token' // 👉 thay bằng token thật nếu dùng

app.post('/deploy', (req, res) => {
  const authHeader = req.headers['authorization']

  // Bảo mật: kiểm tra Authorization nếu cần
  //if (AUTH_TOKEN && (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`)) {
  //  console.warn('❌ Unauthorized deploy attempt.')
  //  return res.status(401).send('Unauthorized')
  //}

  console.log('🚀 Webhook nhan duoc - bat dau chay deploy.bat...')

  exec('deploy.bat', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Loi khi chay deploy.bat: ${error.message}`)
      return res.status(500).send('Loi khi chay deploy')
    }
    if (stderr) {
      console.warn(`⚠️ stderr: ${stderr}`)
    }

    console.log(`✅ stdout: ${stdout}`)
    res.send('Da nhan va chay deploy.bat')
  })
})

app.get('/hello', (req, res) => {
  res.send('✅ Webhook listener dang chay.')
})

app.listen(PORT, () => {
  console.log(`✅ Dang lang nghe webhook tai http://localhost:${PORT}/deploy`)
})
