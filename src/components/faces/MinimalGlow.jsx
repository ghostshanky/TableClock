import React from 'react';
import { useClock } from '../../hooks/useClock';

const MinimalGlow = () => {
    const { hours12, minutes, pad } = useClock(false); // No seconds for minimal

    return (
        <div className="face-container minimal-glow">
            <div className="glow-text">
                {pad(hours12)}:{pad(minutes)}
            </div>

            <style>{`
        .minimal-glow {
            font-family: var(--font-family-main);
        }
        .glow-text {
            font-size: 35vmin;
            font-weight: 100;
            color: var(--color-text-primary);
            text-shadow: 0 0 40px var(--color-accent-success), 0 0 80px var(--color-accent-success);
            line-height: 0.8;
            letter-spacing: -0.08em;
        }
        /* Night Mode - Shift to Red Glow */
        body.night-mode .glow-text {
            color: #ff0000;
            text-shadow: 0 0 30px #990000, 0 0 60px #550000;
        }
      `}</style>
        </div>
    );
};

export default MinimalGlow;
