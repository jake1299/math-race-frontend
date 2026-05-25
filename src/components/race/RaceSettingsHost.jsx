import React, { useState, useRef, useEffect, memo } from 'react';
import { FaGear, FaCheck, FaPause, FaPlay, FaXmark } from "react-icons/fa6";
import ConfirmModal from '../ui/ConfirmModal';
import './RaceSettingsHost.css';

const RaceSettingsHost = ({currentNickname, currentRaceName, isPaused,
                              onChangeNickname, onChangeRaceName, onPauseRace,
                              onResumeRace, onCancelRace}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    const [raceNameInput, setRaceNameInput] = useState("");
    const [confirmAction, setConfirmAction] = useState(null);

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                if (!confirmAction) {
                    setIsOpen(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [confirmAction]);

    const handleOpenToggle = () => {
        if (!isOpen) {
            setNicknameInput(currentNickname || "");
            setRaceNameInput(currentRaceName || "");
        }
        setIsOpen(!isOpen);
    };

    const handleUpdateNickname = () => {
        if (nicknameInput.trim() && nicknameInput !== currentNickname) {
            if (onChangeNickname) onChangeNickname(nicknameInput);
        }
    };

    const handleUpdateRaceName = () => {
        if (raceNameInput.trim() && raceNameInput !== currentRaceName) {
            if (onChangeRaceName) onChangeRaceName(raceNameInput);
        }
    };

    const executeConfirmedAction = () => {
        if (confirmAction === 'PAUSE') onPauseRace();
        else if (confirmAction === 'RESUME') onResumeRace();
        else if (confirmAction === 'CANCEL') onCancelRace();

        setConfirmAction(null);
        setIsOpen(false);
    };

    const getModalMessage = () => {
        switch (confirmAction) {
            case 'PAUSE': return 'Are you sure you want to pause the race?';
            case 'RESUME': return 'Are you sure you want to resume the race?';
            case 'CANCEL': return 'Are you sure you want to completely cancel the race? All progress will be lost (this action cannot be undone!).';
            default: return '';
        }
    };

    return (
        <div className="race-settings-wrapper" ref={wrapperRef}>
            <button className={`settings-tab-btn ${isOpen ? 'active' : ''}`} onClick={handleOpenToggle} title="Host Settings">
                <FaGear className="gear-icon" />
            </button>

            {isOpen && (
                <div className="settings-dropdown-panel game-card">
                    <h3 className="settings-title">Host Settings</h3>

                    <div className="settings-section">
                        <label className="settings-label">Change Host Nickname:</label>
                        <div className="nickname-input-group">
                            <input
                                type="text"
                                className="nickname-input"
                                value={nicknameInput}
                                onChange={(e) => setNicknameInput(e.target.value)}
                                placeholder="New nickname..."
                                maxLength={20}
                                minLength={3}
                            />
                            <button className="nickname-update-btn" onClick={handleUpdateNickname} title="Update nickname">
                                <FaCheck />
                            </button>
                        </div>
                    </div>

                    <div className="settings-section">
                        <label className="settings-label">Change Race Name:</label>
                        <div className="nickname-input-group">
                            <input
                                type="text"
                                className="nickname-input"
                                value={raceNameInput}
                                onChange={(e) => setRaceNameInput(e.target.value)}
                                placeholder="New race name..."
                                maxLength={30}
                                minLength={3}
                            />
                            <button className="nickname-update-btn" onClick={handleUpdateRaceName} title="Update race name">
                                <FaCheck />
                            </button>
                        </div>
                    </div>

                    <div className="settings-divider"></div>

                    <div className="settings-section host-actions-section">
                        <button
                            className="settings-action-btn orange-btn"
                            onClick={() => setConfirmAction(isPaused ? 'RESUME' : 'PAUSE')}
                        >
                            {isPaused ? <><FaPlay className="action-icon"/> Resume Race</> : <><FaPause className="action-icon"/> Pause Race</>}
                        </button>
                        <button
                            className="settings-action-btn red-btn"
                            onClick={() => setConfirmAction('CANCEL')}
                        >
                            <FaXmark className="action-icon"/> Cancel Race
                        </button>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={!!confirmAction}
                message={getModalMessage()}
                onConfirm={executeConfirmedAction}
                onCancel={() => setConfirmAction(null)}
            />
        </div>
    );
};

export default memo(RaceSettingsHost);