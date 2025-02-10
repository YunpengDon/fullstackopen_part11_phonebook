require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, './frontEnd/dist')))

app.use(cors())
app.use(express.json())

morgan.token('body', function (req, ) { return JSON.stringify(req.body) })
// Configure to log messages to console based on the tiny configuration.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Helth check for deployment
app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  let currentTime = new Date()
  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p>
    <p>${currentTime}</>`)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // Reject the request if the name or number is missing
  if (body.name === undefined) {
    return response.status(404).json({
      error: 'name missing'
    })
  }

  Person.findOne({ name: body.name }).then(result => {
    if (result){
      return response.status(404).json({
        error: 'name must be unique'
      })
    }
    else {
      const newPerson = new Person({
        name: body.name,
        number: body.number
      })
      newPerson.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(error => next(error))
    }
  })

})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


if (require.main === module) {
  const PORT = process.env.PORT
  app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
  } )
}

module.exports = app