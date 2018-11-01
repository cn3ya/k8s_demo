const express = require('express')
const app = express()
const http = require('http')
const os=require('os');

app.get('/', (req, res) => res.send(JSON.stringify({
  'service': 'service-a',
  'version': '0.0.4',
  'hostname': os.hostname(),
  'headers': req.headers
})))

app.get('/waiting', (req, res) => setTimeout(function () {
  res.send(JSON.stringify({
    'path': '/waiting',
    'service': 'service-a',
    'version': '0.0.4',
    'hostname': os.hostname()
}))},req.query.time*1000 || 1000))

app.get('/call', (req, res) => {
  let services = req.query.services || '';
  let servicesArray = services.split(',');
  if (servicesArray.length > 0 ) {
    const service = servicesArray.shift();
    const serviceArray = service.split(':');
    services = servicesArray.join();
    let headers = {};
    [
      'x-request-id',
      'x-b3-traceid',
      'x-b3-spanid',
      'x-b3-parentspanid',
      'x-b3-sampled',
      'x-b3-flags',
      'x-ot-span-context'
    ].forEach(item => {
      if (req.get(item)) {
        headers[item] = req.get(item)
      }
    });
    http.get({
      protocol: 'http:',
      host: serviceArray[0],
      port: serviceArray[1],
      path: `/${serviceArray[2]}?services=${services}`,
      headers: headers
    }, (resp) => {
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