import React from 'react';
import { useClock } from '../../hooks/useClock';

const AnalogModern = () => {
    const { hours12, minutes, seconds } = useClock(true);

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6;
    const hourDeg = hours12 * 30 + minutes * 0.5;

    return (
        <div className="face-container analog-modern">
            <div className="clock-dial">
                <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
                <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
                <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
                <div className="center-dot" />
            </div>

            <style>{`
        .analog-modern {
            justify-content: center;
        }
        .clock-dial {
            width: 80vmin;
            height: 80vmin;
            border: 0.5vmin solid rgba(255,255,255,0.2);
            border-radius: 50%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .hand {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom center;
            border-radius: 1vmin;
            background: white;
            transition: transform 0.05s cubic-bezier(0.4, 2.08, 0.55, 0.44); /* Tick effect */
        }
        .hour-hand {
            width: 1.5vmin;
            height: 25vmin;
            margin-left: -0.75vmin;
            background: #fff;
            z-index: 2;
        }
        .minute-hand {
            width: 1vmin;
            height: 35vmin;
            margin-left: -0.5vmin;
            background: #ddd;
            z-index: 3;
        }
        .second-hand {
            width: 0.5vmin;
            height: 38vmin;
            margin-left: -0.25vmin;
            background: var(--color-accent-secondary);
            z-index: 4;
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); /* Smooth sweep */
        }
        .center-dot {
            width: 3vmin;
            height: 3vmin;
            background: var(--color-accent-secondary);
            border-radius: 50%;
            z-index: 5;
            position: absolute;
        }

        /* Night Mode */
        body.night-mode .clock-dial { border-color: rgba(255,0,0,0.3); }
        body.night-mode .hour-hand, body.night-mode .minute-hand { background: #990000; }
        body.night-mode .second-hand, body.night-mode .center-dot { background: #ff0000; }
      `}</style>
        </div>
    );
};

export default AnalogModern;
