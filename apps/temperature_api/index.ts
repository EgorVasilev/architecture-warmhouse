import { RandomTemperatureSensorGatewayAdapter } from "./adapter/secondary/Temperature/TemperatureSensorGatewayAdapter.js";
import { GetTemperatureUseCase } from "./core/Temperature/useCases/getTemperature.js";


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
