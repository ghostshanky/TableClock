import React from 'react';
import { faces } from './faces';

const ClockEngine = ({ type = 'digital', scale = 1 }) => {
    // Find the active face component
    const activeFace = faces.find(f => f.id === type) || faces[0];
    const FaceComponent = activeFace.component;

    return (
        <div className="clock-engine-wrapper" style={{ transform: `scale(${scale})` }}>
            <FaceComponent />

            <style>{`
        .clock-engine-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        /* Base styles for all faces */
        .face-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
      `}</style>
        </div>
    );
};

export default ClockEngine;
