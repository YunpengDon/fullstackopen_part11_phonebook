const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')

const Person = require('../models/person')

const app = require('../index')
const api = supertest(app)

const helper = require('./test_helper')

beforeEach(async () => {
  await Person.deleteMany({})
  console.log('cleared')

  for (let person of helper.initialPeople.persons) {
    let newObject = new Person(person)
    await newObject.save()
  }

  console.log('done')
})

test('notes are returned as json', async () => {
  await api.get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 5 people', async () => {
  const response = await api.get('/api/persons')
  assert.strictEqual(response.body.length, helper.initialPeople.persons.length)
})


after(async () => {
  await mongoose.connection.close()
})
