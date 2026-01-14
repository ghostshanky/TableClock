import React from 'react';
import { useClock } from '../../hooks/useClock';

const numberToWords = (num) => {
    const units = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY'];

    if (num < 20) return units[num];
    const digit = num % 10;
    return (tens[Math.floor(num / 10)] + ' ' + units[digit]).trim();
};

const TextClock = () => {
    const { hours12, minutes } = useClock(false);

    const hWord = numberToWords(hours12 === 0 ? 12 : hours12);
    const mWord = minutes === 0 ? "O'CLOCK" : 'OH ' + numberToWords(minutes);

    return (
        <div className="face-container text-clock">
            <div className="line">IT IS</div>
            <div className="line highlight">{hWord}</div>
            <div className="line highlight">{mWord}</div>

            <style>{`
        .text-clock {
            flex-direction: column;
            font-family: serif;
            text-align: center;
        }
        .text-clock .line {
            font-size: 8vmin;
            line-height: 1.2;
            color: #666;
            letter-spacing: 0.1em;
        }
        .text-clock .line.highlight {
            font-size: 15vmin;
            color: white;
            font-weight: bold;
        }

        /* Night Mode */
        body.night-mode .text-clock .line { color: #550000; }
        body.night-mode .text-clock .line.highlight { color: #ff0000; }
      `}</style>
        </div>
    );
};

export default TextClock;
