const express = require('express')
const uuid = require('uuid') 
import cors from 'cors'

const port = 3001 
const app = express()
app.use(express.json())  
app.use(cors())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

     if(index<0) {
        return response.status(404).json({message: "User not Found"})
    }

    request.userIndex = index
    request.userID = id

    next()
}

// const middleware = (request, response, next) => {
//     console.log('fui chamado')
//     next()
//     console.log('finalizamos o middleware')
// }

// app.use(middleware)

app.get('/users', (request, response) => {

    console.log('A rota get foi chamada')

    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response)=>{
    const id = request.userId

    const { name, age} = request.body

    const index = request.userIndex

    const updatedUser = { id, name, age}

    users[index] = updatedUser

    return response.json(updatedUser)
})


app.delete('/users/:id', checkUserId, (request, response) => {
    // const { id} = request.params   // NAO NECESSARIO ? 

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🐸🐸🐹🐹Server started on port ${port}`)
})