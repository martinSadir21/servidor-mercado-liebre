import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/') {
      const filePath = join(__dirname, 'views', 'home.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } else if (url === '/login') {
      const filePath = join(__dirname, 'views', 'login.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } else if (url === '/register') {
      const filePath = join(__dirname, 'views', 'register.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } else {
      // Archivos estáticos en /public
      // La URL puede venir con /styles.css o /img/logo.png, etc.
      // Quitar la '/' inicial para unir bien
      const staticPath = url.startsWith('/') ? url.slice(1) : url
      const filePath = join(__dirname, 'public', staticPath)

      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        const contentType = getContentType(filePath)
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
      })
    }
  } else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // Redireccionar a home
      res.writeHead(302, { Location: '/' })
      res.end()
    } else {
      res.writeHead(404)
      res.end('Ruta no encontrada')
    }
  } else {
    res.writeHead(405)
    res.end(`Método ${method} no permitido`)
  }
})

const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})