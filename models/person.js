const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.NODE_ENV==='development' ? process.env.MANGO_URI_TEST : process.env.MANGO_URI
console.log(url)


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }
mongoose.connect(url, clientOptions)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
  },
  number: String,
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema)
