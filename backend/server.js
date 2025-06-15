import jsonServer from 'json-server'
import auth from 'json-server-auth'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const router = jsonServer.router('db.json')
app.db = router.db
const PORT = process.env.PORT || 3005 ;

app.use(cors())
app.use(jsonServer.bodyParser)
app.use(auth)
app.use(router)

console.log('PORT from env:', process.env.PORT)
console.log('Using PORT:', PORT)


app.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`)
})