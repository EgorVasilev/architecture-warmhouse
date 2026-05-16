import { RandomTemperatureSensorGatewayAdapter } from "./adapter/secondary/Temperature/TemperatureSensorGatewayAdapter.js";
import { GetTemperatureUseCase } from "./core/Temperature/useCases/getTemperature.js";
import http from 'node:http'

import express, { type Request, type Response, type Application } from 'express';

const app: Application = express();
const port = 8081;

const sensorGatewayAdapter = new RandomTemperatureSensorGatewayAdapter();

app.get('/temperature/:sensorId', async (req: Request, res: Response) => {
  const sensorId = req.params.sensorId;

  if (typeof sensorId !== "string") {
    res.status(400).send();

    return;
  }

  const temperatureQuery = new GetTemperatureUseCase(sensorGatewayAdapter);

  try {
    const temperature = await temperatureQuery.query(null, sensorId);

    res.send({value: temperature.value, status: "active", timestamp: new Date().toISOString()});
  } catch (error) {
    res.status(500).send({error});
  }
});

app.get('/temperature', async (req: Request, res: Response) => {
  const location = req.query.location;

    if (typeof location == "string") {
      const temperatureQuery = new GetTemperatureUseCase(sensorGatewayAdapter);

      try {
       const temperature = await temperatureQuery.query(location);

         res.send({value: temperature.value, status: "active", timestamp: new Date().toISOString()});
      } catch (error) {
         res.status(500).send({error});
      }
  }


  res.status(404).send()
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



// const server = http.createServer(async (req, res) => {
//   const url = new URL(req.url || '', `http://${req.headers.host}`);
//   const queryParams = url.searchParams;

//   switch (url.pathname) {
//     case '/temperature':
//       const temperatureQuery = new GetTemperatureUseCase(sensorGatewayAdapter);

//       try {
//         const temperature = await temperatureQuery.query(queryParams.get('location'), queryParams.get('sensorId'));

//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({temperature: temperature.value}));
//       } catch (error) {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({error}));
//       }

//       break;
//     default:
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       res.end('404 Page Not Found');
//   }
// });

// server.listen(8081, () => {
//   console.log('Server running at http://localhost:8081/');
// });