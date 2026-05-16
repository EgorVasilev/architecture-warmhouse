export type TemperatureUnit = 'C' | 'F' | 'K' // Celsius, Fahrenheit, Kelvin

export interface ITemperature {
    value: number;
    unit: TemperatureUnit;
}

// Uses instead of Planck Temperature
const maxTemp = Number.MAX_SAFE_INTEGER;

const tempLimits = {
    'C': [-273.15, maxTemp],
    'F': [-459.67, maxTemp],
    'K': [0, maxTemp],
} as const;

export class Temperature implements ITemperature {
    value: number;
    unit: TemperatureUnit;
    
    constructor(value: number = 0, unit: TemperatureUnit = 'C') {
        const isValidTemp = this.validateTemp(value, unit);

        if (!isValidTemp) {
            throw new Error('INVALID TEMPERATURE');
        }

        this.value = value;
        this.unit = unit;
    }

    private validateTemp(value: number, unit: TemperatureUnit) {
        const [minTemp, maxTemp] = tempLimits[unit];

        if (value < minTemp || value > maxTemp) {
            return false;
        }

        return true;
    }
}
