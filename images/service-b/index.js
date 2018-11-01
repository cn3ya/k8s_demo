const express = require('express')
const app = express()
const http = require('http')
const os=require('os');

app.get('/', (req, res) => res.send(JSON.stringify({
  'service': 'service-b',
  'version': '0.0.3',
  'hostname': os.hostname()
})))

app.get('/waiting', (req, res) => setTimeout(function () {
  res.send(JSON.stringify({
    'path': '/waiting',
    'service': 'service-b',
    'version': '0.0.3',
    'hostname': os.hostname()
}))},req.query.time*1000 || 1000))

app.get('/call', (req, res) => {
  let services = req.query.services || '';
  let servicesArray = services.split(',');
  // res.send(JSON.stringify(servicesArray));
  if (servicesArray.length > 0 ) {
    const service = servicesArray.shift();
    const serviceArray = service.split(':');
    services = servicesArray.join();
    const url = `http://${serviceArray[0]}:${serviceArray[1]}/${serviceArray[2]}?services=${services}`;
    console.log(url);
    http.get(url, (resp) => {
      let data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.send(data);
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
