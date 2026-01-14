import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { alarmService } from '../services/AlarmService';
import { timerService } from '../services/TimerService';
import { stopwatchService } from '../services/StopwatchService';
import { soundService } from '../services/SoundService';

const ServiceContext = createContext();

export const useServices = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
    // --- STATE ---
    // Alarms
    const [alarms, setAlarms] = useState(alarmService.getAlarms());
    const [activeAlarm, setActiveAlarm] = useState(null); // The one currently ringing

    // Timer (Single instance for now)
    const [timer, setTimer] = useState({ remaining: 0, isRunning: false, duration: 0, isFinished: false });

    // Stopwatch
    const [stopwatch, setStopwatch] = useState(stopwatchService.reset());

    // --- REFS (For mutable access inside interval) ---
    const timerRef = useRef(timer);
    const stopwatchRef = useRef(stopwatch);

    // Keep refs synced with state
    useEffect(() => { timerRef.current = timer; }, [timer]);
    useEffect(() => { stopwatchRef.current = stopwatch; }, [stopwatch]);

    // --- ACTIONS ---

    // Alarms
    const addAlarm = (label, hours, minutes) => {
        const updated = alarmService.addAlarm({ label, hours, minutes });
        setAlarms(updated);
    };
    const toggleAlarm = (id) => {
        const updated = alarmService.toggleAlarm(id);
        setAlarms(updated);
    };
    const deleteAlarm = (id) => {
        const updated = alarmService.deleteAlarm(id);
        setAlarms(updated);
    };
    const dismissAlarm = () => {
        setActiveAlarm(null);
        soundService.stopAlarm();
    };
    const snoozeAlarm = () => {
        setActiveAlarm(null);
        soundService.stopAlarm();
        // TODO: Add snooze logic (add new alarm +5 mins)
    };

    // Timer
    const startTimer = (durationSec) => {
        // Create sets IsRunning=false initially in our specific service impl (maybe), 
        // but let's ensure we start it immediately with the Service's create method which sets target logic
        const newTimer = timerService.create(durationSec);
        // Auto-start (resume logic handles creation of targetTime if needed, but create does it too)
        const runningTimer = timerService.resume(newTimer);
        setTimer(runningTimer);
    };
    const pauseTimer = () => setTimer(prev => timerService.pause(prev));
    const resumeTimer = () => setTimer(prev => timerService.resume(prev));
    const resetTimer = () => {
        setTimer({ remaining: 0, isRunning: false, duration: 0, isFinished: false });
        soundService.stopAlarm(); // Stop any timer sound
    };

    // Stopwatch
    const startStopwatch = () => setStopwatch(prev => stopwatchService.start(prev));
    const stopStopwatch = () => setStopwatch(prev => stopwatchService.stop(prev));
    const resetStopwatch = () => setStopwatch(stopwatchService.reset());
    const lapStopwatch = () => setStopwatch(prev => stopwatchService.lap(prev));

    // --- MASTER TICK LOOP ---
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            // 1. Check Alarms
            const triggered = alarmService.check(now);
            if (triggered) {
                setActiveAlarm(prev => {
                    if (!prev) {
                        soundService.playAlarm(); // Play Sound!
                        return triggered;
                    }
                    return prev;
                });
            }

            // 2. Tick Timer
            if (timerRef.current.isRunning) {
                const nextTimer = timerService.tick(timerRef.current);

                // Only update React state if seconds changed to avoid re-renders (optimization)
                // OR if it finished
                if (nextTimer.remaining !== timerRef.current.remaining || nextTimer.isFinished) {
                    setTimer(nextTimer);

                    if (nextTimer.isFinished && !timerRef.current.isFinished) {
                        // Timer Just Finished!
                        soundService.playAlarm();
                        // We could show the AlarmOverlay for this too, or a specific Timer Overlay based on ID
                        // For now, assume sound is enough or reusing the concept needs state
                        setActiveAlarm({ label: "Timer Finished!", hours: 0, minutes: 0 }); // Hack to show overlay
                    }
                }
            }

            // 3. Tick Stopwatch
            if (stopwatchRef.current.isRunning) {
                const nextSw = stopwatchService.tick(stopwatchRef.current);
                setStopwatch(nextSw);
            }

        }, 100); // 100ms precision

        return () => clearInterval(interval);
    }, []);

    const value = {
        alarms, activeAlarm, addAlarm, toggleAlarm, deleteAlarm, dismissAlarm, snoozeAlarm,
        timer, startTimer, pauseTimer, resumeTimer, resetTimer,
        stopwatch, startStopwatch, stopStopwatch, resetStopwatch, lapStopwatch
    };

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    );
};
