import React from 'react';
import { useClock } from '../../hooks/useClock';

const MatrixStyle = () => {
    const { hours24, minutes, binaryHours, binaryMinutes } = useClock(false);

    return (
        <div className="face-container matrix-style">
            <div className="matrix-row large">
                {binaryHours} : {binaryMinutes}
            </div>
            <div className="matrix-row label">
                TIME_SEQ: {hours24}{minutes}
            </div>

            <style>{`
        .matrix-style {
            flex-direction: column;
            font-family: 'Courier New', monospace;
            background: #000; /* Always black */
        }
        .matrix-row {
            color: #00ff00;
            text-shadow: 0 0 10px #00ff00;
        }
        .matrix-row.large {
            font-size: 15vmin;
            font-weight: bold;
            letter-spacing: 0.2em;
        }
        .matrix-row.label {
            margin-top: 4vmin;
            font-size: 4vmin;
            opacity: 0.7;
        }

        /* Night Mode - Red Matrix */
        body.night-mode .matrix-row {
            color: #ff0000;
            text-shadow: 0 0 10px #ff0000;
        }
      `}</style>
        </div>
    );
};

export default MatrixStyle;
