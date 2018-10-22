const express = require('express')
const app = express()
const os=require('os');

app.get('/', (req, res) => res.send(JSON.stringify({
  'service': 'service-a',
  'version': '0.0.1',
  'hostname': os.hostname()
})))

app.listen(3000, () => console.log('Example app listening on port 3000!'))