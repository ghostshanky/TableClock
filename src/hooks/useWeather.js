import { useState, useEffect } from 'react';

/**
 * useWeather Hook
 * 
 * Provides temperature and humidity data. 
 * Currently acts as a "Smart Sensor" simulator with plausible fluctuating values
 * to mimic a high-end sensor reading.
 * 
 * Future integration: Can accept an API key for OpenWeatherMap.
 */
export const useWeather = () => {
    const [weather, setWeather] = useState({
        temp: 22.5,
        humidity: 45,
        condition: 'Clear',
        loading: true
    });

    useEffect(() => {
        // Simulation Mode: Gently fluctuate the values to look "alive"
        // Base values
        let baseTemp = 22; // Celsius
        let baseHum = 45; // Percentage

        const updateSensor = () => {
            // Random micro-fluctuations
            const tempDrift = (Math.random() - 0.5) * 0.2;
            const humDrift = (Math.random() - 0.5) * 1.5;

            setWeather(prev => ({
                temp: parseFloat((baseTemp + tempDrift).toFixed(1)), // Keep 1 decimal
                humidity: Math.round(baseHum + humDrift),
                condition: 'Indoor Mode', // Placeholder
                loading: false
            }));
        };

        // Initial set
        updateSensor();

        // Update every 5 seconds to feel like a real sensor polling
        const interval = setInterval(updateSensor, 5000);

        return () => clearInterval(interval);
    }, []);

    return weather;
};
