import { useState, useEffect } from 'react';

/**
 * useTimeSync Hook
 * 
 * Fetches accurate time from a "world time" API to simulate NTP synchronization.
 * Calculates the offset between device time and server time.
 * 
 * @returns {Object} { offset, isSynced, lastSyncTime }
 */
export const useTimeSync = () => {
    const [offset, setOffset] = useState(0); // Difference in ms
    const [isSynced, setIsSynced] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(null);

    const syncTime = async () => {
        try {
            // Using worldtimeapi.org as a free JSON time source
            const start = Date.now();
            const response = await fetch('https://worldtimeapi.org/api/ip');
            const data = await response.json();
            const end = Date.now();

            // Network latency adjustment (RTT / 2)
            const latency = (end - start) / 2;

            // Server time at the moment of reception
            const serverTime = new Date(data.datetime).getTime() + latency;
            const deviceTime = Date.now();

            const newOffset = serverTime - deviceTime;

            setOffset(newOffset);
            setIsSynced(true);
            setLastSyncTime(new Date());

            console.log(`[TimeSync] Synced! Offset: ${newOffset}ms`);
        } catch (error) {
            console.warn('[TimeSync] Failed to sync time:', error);
            setIsSynced(false);
        }
    };

    useEffect(() => {
        // Initial Sync
        syncTime();

        // Resync every 10 minutes
        const interval = setInterval(syncTime, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { offset, isSynced, lastSyncTime };
};
