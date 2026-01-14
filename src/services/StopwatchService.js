/**
 * StopwatchService.js
 * 
 * Manages stopwatch logic using accurate diffing.
 */
class StopwatchService {
    start(state) {
        return {
            ...state,
            isRunning: true,
            startTime: Date.now() - state.elapsed
        };
    }

    stop(state) {
        return {
            ...state,
            isRunning: false
        };
    }

    reset() {
        return {
            startTime: 0,
            elapsed: 0,
            isRunning: false,
            laps: []
        };
    }

    lap(state) {
        if (!state.isRunning) return state;
        return {
            ...state,
            laps: [...state.laps, state.elapsed]
        };
    }

    tick(state) {
        if (!state.isRunning) return state;
        return {
            ...state,
            elapsed: Date.now() - state.startTime
        };
    }
}

export const stopwatchService = new StopwatchService();
