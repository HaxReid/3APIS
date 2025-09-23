import http from 'http'
import fs from 'fs'

const server = http.createServer(maCallback)

server.listen(3000, () => {
  console.log('en écoute sur le port 3000')
})

function maCallback(request, response) {
  // SERVEUR DES PAGES INDEX ET FORM :
  const { method, url } = request

  if (method === 'GET') {
    const adress = url === '/form' ? 'form' : 'index'
    const htmlPage = fs.readFileSync(`./public/${adress}.html`)
    response.setHeader('Content-Type', 'text/html')
    response.end(htmlPage)
  }

  let data = ''
  if (request.method == 'POST') {
    request.on('data', function (chunk) {
      data += chunk.toString()
    })
    request.on('end', function () {
      const parsedData = JSON.parse(data)
      console.log(parsedData.name, 'connected')

      response.writeHead(201)
      response.end('received')
    })
  }
}
