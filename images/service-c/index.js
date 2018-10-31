const express = require('express')
const app = express()
const os=require('os');

app.get('/', (req, res) => res.send(JSON.stringify({
  'service': 'service-c',
  'version': '0.0.3',
  'hostname': os.hostname()
})))

app.get('/waiting', (req, res) => setTimeout(function () {
  res.send(JSON.stringify({
    'path': '/waiting',
    'service': 'service-c',
    'version': '0.0.3',
    'hostname': os.hostname()
  }))},req.query.time*1000 || 1000))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
