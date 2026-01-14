import React from 'react';
import { useClock } from '../../hooks/useClock';

const FlipCard = ({ value }) => (
    <div className="flip-card">
        {value}
    </div>
);

const FlipClock = () => {
    const { hours12, minutes, pad, amPm } = useClock(false);

    return (
        <div className="face-container flip-clock">
            <FlipCard value={pad(hours12)} />
            <div className="separator">:</div>
            <FlipCard value={pad(minutes)} />
            <div className="ampm-indicator">{amPm}</div>

            <style>{`
        .flip-clock {
            flex-direction: row;
            gap: 2vmin;
            font-family: var(--font-family-mono);
        }
        .flip-card {
            background: #1a1a1a;
            color: #e0e0e0;
            font-size: 25vmin;
            font-weight: 700;
            padding: 4vmin 2vmin;
            border-radius: 2vmin;
            min-width: 35vmin;
            text-align: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        /* Fake the "split" line */
        .flip-card::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: #000;
            box-shadow: 0 1px 0 rgba(255,255,255,0.1);
            transform: translateY(-50%);
        }
        .separator {
            font-size: 20vmin;
            color: #444;
            padding-bottom: 2vmin;
        }
        .ampm-indicator {
            position: absolute;
            bottom: 10vmin;
            font-size: 4vmin;
            font-weight: bold;
            letter-spacing: 0.2em;
            color: #666;
        }

        /* Night Mode */
        body.night-mode .flip-card {
            background: #110000;
            color: #cc0000;
        }
      `}</style>
        </div>
    );
};

export default FlipClock;
