import type { Temperature } from "../../../core/Temperature/domain/Temperature.js";
import type { TemperatureSensorGatewayPort } from "../../../core/Temperature/port/secondary/TemperatureSensorGateway.js";

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export class RandomTemperatureSensorGatewayAdapter implements TemperatureSensorGatewayPort {
    getTemperature(sensorId: string): Promise<number> {
        return new Promise((resolve, reject) => {
            if (sensorId === "0") {
                reject("SENSOR NOT FOUND")
            }

            resolve(+getRandomFloat(-30, 30).toFixed(1))
        })
    }
}