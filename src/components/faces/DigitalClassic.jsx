import React from 'react';
import { useClock } from '../../hooks/useClock';

const DigitalClassic = () => {
    const { hours12, minutes, seconds, amPm, dateString, pad } = useClock(true);

    return (
        <div className="face-container digital-classic">
            <div className="time-display">
                <span className="h-m">
                    {pad(hours12)}<span className="colon">:</span>{pad(minutes)}
                </span>
                <div className="side-info">
                    <span className="seconds">{pad(seconds)}</span>
                    <span className="ampm">{amPm}</span>
                </div>
            </div>
            <div className="date-display">{dateString}</div>

            <style>{`
        .digital-classic {
            flex-direction: column;
            font-family: var(--font-family-main);
        }
        .digital-classic .time-display {
            display: flex;
            align-items: baseline;
            line-height: 1;
        }
        .digital-classic .h-m {
            font-size: 25vmin;
            font-weight: 200;
            letter-spacing: -0.05em;
        }
        .digital-classic .side-info {
            display: flex;
            flex-direction: column;
            margin-left: max(2vmin, 16px);
        }
        .digital-classic .seconds {
            font-size: 8vmin;
            font-weight: 300;
            color: var(--color-text-secondary);
        }
        .digital-classic .ampm {
            font-size: 4vmin;
            margin-top: 1vmin;
            color: var(--color-text-muted);
            font-weight: 600;
        }
        .digital-classic .date-display {
            font-size: 6vmin;
            margin-top: 4vmin;
            font-weight: 300;
            color: var(--color-text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        /* Night Mode Overrides */
        body.night-mode .digital-classic .h-m { color: #cc0000; }
        body.night-mode .digital-classic .seconds { color: #880000; }
        body.night-mode .digital-classic .date-display { color: #660000; }
      `}</style>
        </div>
    );
};

export default DigitalClassic;
