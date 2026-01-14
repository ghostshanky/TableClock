import { useState, useEffect } from "react";

export function useClock(showSeconds = true) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => setNow(new Date()),
            showSeconds ? 1000 : 60000
        );
        return () => clearInterval(interval);
    }, [showSeconds]);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return {
        dateObj: now,
        hours24: now.getHours(),
        hours12: now.getHours() % 12 || 12,
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        amPm: now.getHours() >= 12 ? 'PM' : 'AM',
        dateString: `${days[now.getDay()]} • ${now.getDate()} ${months[now.getMonth()]}`,
        fullDate: now.toDateString(),
        // Helpers for formatting
        pad: (num) => String(num).padStart(2, '0'),
        binaryHours: now.getHours().toString(2).padStart(5, '0'), // For Matrix
        binaryMinutes: now.getMinutes().toString(2).padStart(6, '0'), // For Matrix
    };
}
