#!/usr/bin/env node
const InputProgram = require('./input')
const CreateProject = require('./createProject')

InputProgram((params) => {
  console.log(JSON.stringify(params, null, '  '))
  let a = new CreateProject(params)
})
