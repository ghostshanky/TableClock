import { useEffect } from 'react';
import { StatusBar } from '@capacitor/status-bar';

export const useNativeUI = () => {
    useEffect(() => {
        const hideSystemBars = async () => {
            try {
                await StatusBar.hide();
                console.log('System bars hidden');
            } catch (err) {
                console.warn('Native UI control not available (Browser mode?)', err);
            }
        };

        // Initial hide
        hideSystemBars();

        // Re-hide on interaction if they reappear (immersive mode stickiness)
        const handleInteraction = () => {
            // Optional: debounce this if needed
            hideSystemBars();
        };

        window.addEventListener('click', handleInteraction);
        return () => window.removeEventListener('click', handleInteraction);
    }, []);
};
