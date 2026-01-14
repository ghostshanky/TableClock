import React from 'react';
import { useClock } from '../../hooks/useClock';

/**
 * FaceRenderer Engine
 * Renders a clock face based on a JSON Configuration.
 * 
 * @param {Object} props
 * @param {Object} props.face - The Face Configuration Object
 */
export const FaceRenderer = ({ face }) => {
    const clock = useClock(true);

    // Helper to resolve text content based on layer type
    const resolveText = (layer) => {
        switch (layer.type) {
            case 'time':
                // Default format HH:mm. Simple implementation for now.
                // Future: Support full format string parsing
                return `${clock.pad(clock.hours12)}:${clock.pad(clock.minutes)}`;
            case 'seconds':
                return clock.pad(clock.seconds);
            case 'date':
                return clock.dateString;
            case 'am_pm':
                return clock.amPm;
            case 'custom':
                return layer.text || '';
            default:
                return '';
        }
    };

    if (!face || !face.layers) return null;

    // Background handling
    const bgStyle = {};
    if (face.background.type === 'solid') {
        bgStyle.backgroundColor = face.background.colors[0];
    } else if (face.background.type === 'gradient') {
        bgStyle.background = `linear-gradient(to bottom, ${face.background.colors.join(', ')})`;
    } else if (face.background.type === 'image') {
        bgStyle.backgroundImage = `url(${face.background.image})`;
        bgStyle.backgroundSize = 'cover';
    }

    return (
        <div className="face-engine-container" style={bgStyle}>
            {face.layers.map((layer) => {
                const commonStyle = {
                    position: 'absolute',
                    left: `${layer.x}%`,
                    top: `${layer.y}%`,
                    transform: `translate(-50%, -50%) rotate(${layer.rotation || 0}deg)`,
                    opacity: layer.opacity !== undefined ? layer.opacity : 1,
                    zIndex: layer.zIndex || 1,
                };

                if (['time', 'date', 'seconds', 'custom', 'am_pm'].includes(layer.type)) {
                    return (
                        <div
                            key={layer.id}
                            className="layer-text"
                            style={{
                                ...commonStyle,
                                fontSize: `${layer.fontSize}vmin`,
                                fontFamily: layer.fontFamily || 'inherit',
                                color: layer.color,
                                letterSpacing: `${layer.letterSpacing || 0}em`,
                                textAlign: layer.textAlign || 'center',
                                textShadow: layer.glow ? `0 0 ${layer.glow.radius}px ${layer.glow.color}` : 'none',
                                fontWeight: layer.fontWeight || 400,
                            }}
                        >
                            {resolveText(layer)}
                        </div>
                    );
                }

                if (layer.type === 'shape') {
                    const shapeStyle = {
                        ...commonStyle,
                        backgroundColor: layer.color,
                        width: `${layer.width}vmin`,
                        height: `${layer.height}vmin`,
                        boxShadow: layer.glow ? `0 0 ${layer.glow.radius}px ${layer.glow.color}` : 'none',
                    };

                    if (layer.shape === 'circle') shapeStyle.borderRadius = '50%';
                    if (layer.shape === 'line') shapeStyle.height = `${layer.height}vmin`; // Lines often defined by height/width differently

                    return <div key={layer.id} className="layer-shape" style={shapeStyle} />;
                }

                return null;
            })}

            <style>{`
        .face-engine-container {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .layer-text {
            white-space: nowrap;
        }
      `}</style>
        </div>
    );
};
