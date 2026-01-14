import React from 'react';
import { useClock } from '../../hooks/useClock';

const NeonCyber = () => {
    const { hours24, minutes, seconds, pad } = useClock(true);

    return (
        <div className="face-container neon-cyber">
            <div className="neon-time">
                <span className="part">{pad(hours24)}</span>
                <span className="blink">:</span>
                <span className="part">{pad(minutes)}</span>
                <span className="blink">:</span>
                <span className="part small">{pad(seconds)}</span>
            </div>

            <style>{`
        .neon-cyber {
            font-family: var(--font-family-mono);
            letter-spacing: 0.1em;
        }
        .neon-time {
            font-size: 18vmin;
            font-weight: 900;
            color: transparent;
            -webkit-text-stroke: 0.3vmin var(--color-accent-primary);
            text-shadow: 
                0 0 10px var(--color-accent-primary),
                0 0 30px var(--color-accent-primary),
                0 0 70px var(--color-accent-primary);
            display: flex;
            align-items: baseline;
        }
        .part.small {
            font-size: 10vmin;
            margin-left: 1vmin;
            -webkit-text-stroke: 0.2vmin var(--color-accent-secondary);
            text-shadow: 
                0 0 10px var(--color-accent-secondary),
                0 0 40px var(--color-accent-secondary);
        }
        .blink {
            animation: blink 1s infinite;
            margin: 0 1vmin;
            color: var(--color-accent-primary);
            text-shadow: 0 0 20px var(--color-accent-primary);
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        /* Night Mode */
        body.night-mode .neon-time { 
            -webkit-text-stroke-color: #ff0000;
            text-shadow: 0 0 30px #ff0000;
        }
        body.night-mode .part.small, body.night-mode .blink {
             -webkit-text-stroke-color: #ff0000;
             color: #ff0000;
             text-shadow: 0 0 30px #ff0000;
        }
      `}</style>
        </div>
    );
};

export default NeonCyber;
