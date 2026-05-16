import type { Temperature } from "../../../domain/Temperature.js";
import type { TemperatureSensorGatewayPort } from "../../secondary/TemperatureSensorGateway.js";

export interface GetTemperature {
    query(locationId?: string, sensorId?: string): Promise<Temperature>
}