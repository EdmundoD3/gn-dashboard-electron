import server from './src/app.js'
const port = 5000

server.listen(port, () => {
  console.log(`Server started in http://localhost:${port}/`)
})
