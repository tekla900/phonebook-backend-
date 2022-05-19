const express = require('express')
const app = express()

app.use(express.json())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    const date = Date()
    response.send( 
         `<div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${date}</p>
            </div>`
        )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  

app.post('/api/persons', (request, response) => {
    const body = request.body
    const personName = body.name
    const personNumber = body.number

    if (Object.keys(body).length === 0) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (!personName) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!personNumber) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if(persons.filter(person => person.name === personName).length  != 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: personName,
        number: personNumber,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
    console.log(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
