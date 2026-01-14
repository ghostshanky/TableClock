/**
 * AlarmService.js
 * 
 * Manages alarm data, persistence, and checking logic.
 */
class AlarmService {
    constructor() {
        this.STORAGE_KEY = 'tableClock_alarms';
    }

    getAlarms() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    saveAlarms(alarms) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(alarms));
    }

    addAlarm(alarm) {
        const alarms = this.getAlarms();
        // Ensure new alarm has an ID
        const newAlarm = { ...alarm, id: Date.now().toString(), enabled: true };
        alarms.push(newAlarm);
        this.saveAlarms(alarms);
        return alarms;
    }

    deleteAlarm(id) {
        const alarms = this.getAlarms();
        const filtered = alarms.filter(a => a.id !== id);
        this.saveAlarms(filtered);
        return filtered;
    }

    toggleAlarm(id) {
        const alarms = this.getAlarms();
        const updated = alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a);
        this.saveAlarms(updated);
        return updated;
    }

    // Check if any alarm should trigger right now
    check(now) {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Check only at the start of the minute (0 seconds) to avoid multiple triggers
        if (seconds !== 0) return null;

        const alarms = this.getAlarms();
        // Return the first matching enabled alarm
        // TODO: Handle day repetition logic
        return alarms.find(a => a.enabled && a.hours === hours && a.minutes === minutes);
    }
}

export const alarmService = new AlarmService();
