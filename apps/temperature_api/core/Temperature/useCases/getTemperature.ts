import { Temperature } from "../domain/Temperature.js";
import type { GetTemperature } from "../port/primary/query/getTemperature.js";
import type { TemperatureSensorGatewayPort } from "../port/secondary/TemperatureSensorGateway.js";

export class GetTemperatureUseCase implements GetTemperature {
    constructor(private sensorGateway: TemperatureSensorGatewayPort) {
    }

    private defineSensorId(location?: string | null, sensorId?: string | null) {
        if (!sensorId) {
            let sensorIdByLocation;

            console.log('location', location, location === "Kitchen")
            switch (location) {
		        case "Living Room":
			        sensorIdByLocation = "1"
                    break;
		        case "Bedroom":
			        sensorIdByLocation = "2"
                    break;
		        case "Kitchen":
			        sensorIdByLocation = "3"
                    break;
		        default:
			        sensorIdByLocation = "0"
		    }

            return sensorIdByLocation;
        }

        return sensorId || "0"
    }

    query(location?: string | null, sensorId?: string | null): Promise<Temperature> {
        return new Promise((resolve, reject) => {
            if (!location && !sensorId) {
                // Meaningless params lead Temperature NULL-object
                resolve(new Temperature())
            }

            this.sensorGateway.getTemperature(this.defineSensorId(location, sensorId))
                .then(temperature => {resolve(new Temperature(temperature))})
                .catch(reject);
        })
    }
}