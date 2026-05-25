import React, {useState, useRef, useEffect, memo} from 'react';
import { FaGear, FaRightFromBracket, FaCheck } from "react-icons/fa6";
import './RaceSettingsPlayer.css';

const RaceSettingsPlayer = ({ currentNickname, onChangeNickname, onLeaveRace }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOpenToggle = () => {
        if (!isOpen) {
            setNicknameInput(currentNickname || "");
        }
        setIsOpen(!isOpen);
    };

    const handleUpdate = () => {
        if (nicknameInput.trim() && nicknameInput !== currentNickname) {
            onChangeNickname(nicknameInput);
        }
        setIsOpen(false);
    };

    return (
        <div className="race-settings-wrapper" ref={wrapperRef}>
            <button className={`settings-tab-btn ${isOpen ? 'active' : ''}`} onClick={handleOpenToggle} title="Settings">
                <FaGear className="gear-icon" />
            </button>

            {isOpen && (
                <div className="settings-dropdown-panel game-card">
                    <h3 className="settings-title">Settings</h3>

                    <div className="settings-section">
                        <label className="settings-label">Change Nickname:</label>
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
                            <button className="nickname-update-btn" onClick={handleUpdate} title="Update">
                                <FaCheck />
                            </button>
                        </div>
                    </div>

                    <div className="settings-divider"></div>

                    <div className="settings-section">
                        <button className="settings-leave-btn" onClick={onLeaveRace}>
                            <FaRightFromBracket style={{ marginRight: '8px' }}/>
                            Leave Race
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default memo(RaceSettingsPlayer);