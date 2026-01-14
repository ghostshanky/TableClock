/**
 * TimeService.js
 * 
 * Central source of truth for time.
 * Handles formatting and simple date operations.
 */
class TimeService {
    getNow() {
        return new Date();
    }

    format(date, formatStr) {
        // Simple formatter helper
        const pad = (n) => n.toString().padStart(2, '0');
        const map = {
            'HH': pad(date.getHours()),
            'mm': pad(date.getMinutes()),
            'ss': pad(date.getSeconds()),
            'YYYY': date.getFullYear(),
            'MM': pad(date.getMonth() + 1),
            'DD': pad(date.getDate()),
        };

        return formatStr.replace(/HH|mm|ss|YYYY|MM|DD/g, (matched) => map[matched]);
    }
}

export const timeService = new TimeService();
