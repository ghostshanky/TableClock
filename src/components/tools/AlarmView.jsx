import React, { useState } from 'react';
import { useServices } from '../../context/ServiceContext';
import { IconTrash, IconPlus } from '../Icons';

const AlarmView = () => {
    const { alarms, addAlarm, toggleAlarm, deleteAlarm } = useServices();
    const [isAdding, setIsAdding] = useState(false);

    // New Alarm State
    const [newTime, setNewTime] = useState('07:00');
    const [newLabel, setNewLabel] = useState('Wake Up');

    const handleAdd = () => {
        const [h, m] = newTime.split(':').map(Number);
        addAlarm(newLabel, h, m);
        setIsAdding(false);
    };

    if (isAdding) {
        return (
            <div className="tool-view alarm-add">
                <h3>New Alarm</h3>
                <input
                    type="time"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="time-picker"
                />
                <input
                    type="text"
                    value={newLabel}
                    onChange={e => setNewLabel(e.target.value)}
                    placeholder="Label"
                    className="label-input"
                />
                <div className="controls-row">
                    <button className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                    <button className="btn-primary" onClick={handleAdd}>Save</button>
                </div>
                <style>{`
                    .alarm-add { display: flex; flex-direction: column; gap: 1.5rem; }
                    .time-picker { font-size: 2.5rem; background: #222; border: none; color: white; padding: 0.5rem; border-radius: 10px; }
                    .label-input { padding: 1rem; background: #222; border: 1px solid #444; color: white; border-radius: 5px; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="tool-view alarm-list-view">
            <div className="header-actions">
                <button className="btn-icon-add" onClick={() => setIsAdding(true)}>
                    <IconPlus className="icon" />
                </button>
            </div>

            <div className="alarms-list">
                {alarms.length === 0 && <div className="empty-state">No Alarms</div>}

                {alarms.map(alarm => (
                    <div key={alarm.id} className="alarm-item">
                        <div className="alarm-info">
                            <span className="alarm-time">
                                {alarm.hours.toString().padStart(2, '0')}:{alarm.minutes.toString().padStart(2, '0')}
                            </span>
                            <span className="alarm-label">{alarm.label}</span>
                        </div>
                        <div className="alarm-actions">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={alarm.enabled}
                                    onChange={() => toggleAlarm(alarm.id)}
                                />
                                <span className="slider round"></span>
                            </label>
                            <button className="btn-delete" onClick={() => deleteAlarm(alarm.id)}>
                                <IconTrash className="icon" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .alarm-list-view { display: flex; flex-direction: column; height: 100%; }
                .header-actions { display: flex; justify-content: flex-end; margin-bottom: 1rem; }
                .btn-icon-add { font-size: 1.5rem; width: 3rem; height: 3rem; border-radius: 50%; background: var(--color-accent-primary); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; }
                .btn-icon-add .icon { width: 1.5rem; height: 1.5rem; }
                
                .alarms-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
                .alarm-item { background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; }
                .alarm-time { font-size: 2rem; font-weight: bold; display: block; }
                .alarm-label { color: #888; font-size: 0.9rem; }
                
                .switch { position: relative; display: inline-block; width: 50px; height: 28px; margin-right: 10px; }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #444; transition: .4s; border-radius: 34px; }
                .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
                input:checked + .slider { background-color: var(--color-accent-primary); }
                input:checked + .slider:before { transform: translateX(22px); }
                
                .btn-delete { background: none; border: none; font-size: 1.2rem; cursor: pointer; opacity: 0.5; color: white; display: flex; align-items: center; justify-content: center; padding: 0.5rem; }
                .btn-delete .icon { width: 1.2rem; height: 1.2rem; }
                .btn-delete:hover { opacity: 1; color: red; }
            `}</style>
        </div>
    );
};

export default AlarmView;
