import { useEffect } from 'react';

export const useWakeLock = () => {
    useEffect(() => {
        let wakeLock = null;

        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    wakeLock = await navigator.wakeLock.request('screen');
                    console.log('Screen Wake Lock active (Web API)');
                } else {
                    console.warn('Wake Lock API not supported in this browser.');
                }
            } catch (err) {
                console.error('Wake Lock failed:', err);
            }
        };

        requestWakeLock();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (wakeLock) wakeLock.release();
        };
    }, []);
};
