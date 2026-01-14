/**
 * TimerService.js
 * 
 * Manages a single countdown timer using robust delta-time calculation.
 */
class TimerService {
    // Start a timer
    create(durationSec) {
        const now = Date.now();
        return {
            id: now.toString(),
            duration: durationSec,
            remaining: durationSec,
            targetTime: now + (durationSec * 1000),
            startTime: now, // Used for pause/resume offset calculation if needed
            isRunning: false,
            isFinished: false
        };
    }

    // Tick: Update remaining based on current time vs target
    tick(timerState) {
        if (!timerState.isRunning || timerState.isFinished) return timerState;

        const now = Date.now();
        const diff = Math.ceil((timerState.targetTime - now) / 1000);

        if (diff <= 0) {
            return { ...timerState, isRunning: false, remaining: 0, isFinished: true };
        }

        return { ...timerState, remaining: diff };
    }

    // Pause: Store the remaining time so we can set a new target on resume
    pause(timerState) {
        if (!timerState.isRunning) return timerState;

        // We really just need to stop running. The UI uses 'remaining' which is updated by tick.
        // But to Resume accurately, we must recalculate targetTime when we resume.
        // We'll trust that 'remaining' is accurate from the last tick.
        return { ...timerState, isRunning: false };
    }

    // Resume: Calculate new target based on current remaining
    resume(timerState) {
        if (timerState.isRunning) return timerState;

        const now = Date.now();
        return {
            ...timerState,
            isRunning: true,
            targetTime: now + (timerState.remaining * 1000)
        };
    }
}

export const timerService = new TimerService();

