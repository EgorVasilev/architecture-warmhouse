import type { Temperature } from "../../domain/Temperature.js";

export interface TemperatureSensorGatewayPort {
    getTemperature(sensorId: string): Promise<number>;
}