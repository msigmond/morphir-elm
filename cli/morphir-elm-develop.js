#!/usr/bin/env node
'use strict'

// NPM imports
const path = require('path')
const commander = require('commander')
const express = require('express')
const cli = require('./cli')

// Set up Commander
const program = new commander.Command()
program
  .name('morphir-elm develop')
  .description('Start up a web server and expose developer tools through a web UI')
  .option('-p, --project-dir <path>', 'Root directory of the project where morphir.json is located.', '.')
  .parse(process.argv)

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect('index.html')
})

app.use(express.static(path.join(__dirname, 'web')))

app.get('/server/make', (req, res) => {
  cli.make(program.projectDir)
    .then((packageDef) => {
      res.send(['ok', packageDef])
    })
    .catch((err) => {
      res.send(['err', err])
    })
})

app.listen(port, () => {
  console.log(`Developer server listening at http://localhost:${port}`)
})

