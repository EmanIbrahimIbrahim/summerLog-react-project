import jsonServer from 'json-server'
import auth from 'json-server-auth'
import cors from 'cors'
import express from 'express'

const app = express()
const router = jsonServer.router('db.json')
app.db = router.db

app.use(cors())
app.use(jsonServer.bodyParser)
app.use(auth)
app.use(router)

app.listen(8000, () => {
  console.log('JSON Server running on http://localhost:8000')
})
