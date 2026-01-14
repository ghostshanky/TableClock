import React from 'react';
import { useClock } from '../../hooks/useClock';

const numberToWords = (num) => {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

    if (num < 20) return units[num];
    const digit = num % 10;
    return (tens[Math.floor(num / 10)] + (digit ? ' ' + units[digit] : '')).trim();
};

const TypeWriter = () => {
    const { hours12, minutes, amPm, dateObj } = useClock(true);

    const hWord = numberToWords(hours12 === 0 ? 12 : hours12);
    // Split minutes into two parts if needed or just one line?
    // Image shows "thirty four" on two lines: "thirty" then "four"
    // But "eight thirty four" is 3 lines.
    // Let's split minutes word.

    const mWord = minutes === 0 ? "o'clock" : numberToWords(minutes);
    const mParts = mWord.split(' '); // "thirty four" -> ["thirty", "four"]

    // Format Date: Tuesday August 5th, 2014
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
    const dateNum = dateObj.getDate();
    const year = dateObj.getFullYear();
    const suffix = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };
    const dateFull = `${day} ${month} ${dateNum}${suffix(dateNum)}, ${year}`;

    return (
        <div className="face-container typewriter">
            <div className="text-stack">
                <div className="line">{hWord}</div>
                {minutes === 0 ? (
                    <div className="line">o'clock</div>
                ) : (
                    mParts.map((part, i) => <div key={i} className="line indent">{part}</div>)
                )}
            </div>

            <div className="bottom-bar">
                <span className="ampm-corner">{amPm}</span>
                <span className="date-corner">{dateFull}</span>
                <div className="bar-line"></div>
            </div>

            <style>{`
                .typewriter {
                    background: #111;
                    color: #fff;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 10vmin;
                    box-sizing: border-box;
                    font-family: 'Segoe UI Light', 'Helvetica Neue', sans-serif;
                }
                .text-stack {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex-grow: 1;
                }
                .line {
                    font-size: 18vmin;
                    line-height: 1;
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: #f0f0f0;
                }
                .line.indent {
                    color: #ccc; /* Slight dim for minutes */
                }
                
                .bottom-bar {
                    width: 100%;
                    position: relative;
                    margin-top: 5vmin;
                    padding-top: 2vmin;
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }
                .bar-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: rgba(255,255,255,0.2);
                }
                .ampm-corner {
                    font-size: 4vmin;
                    opacity: 0.6;
                }
                .date-corner {
                    font-size: 4vmin;
                    opacity: 0.8;
                    text-align: right;
                }

                /* Night Mode */
                body.night-mode .typewriter { background: #000; }
                body.night-mode .line { color: #cc0000; }
                body.night-mode .line.indent { color: #880000; }
                body.night-mode .date-corner, body.night-mode .ampm-corner { color: #aa0000; }
            `}</style>
        </div>
    );
};

export default TypeWriter;
