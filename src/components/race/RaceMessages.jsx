import React, { useState, useRef, useEffect, memo } from 'react';
import { FaRegCommentDots } from "react-icons/fa6";
import './RaceMessages.css';

const RaceMessages = ({ messages = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewedCount, setViewedCount] = useState(messages.length);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setViewedCount(messages.length);
        }
    }, [messages, isOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!isOpen) {
            setViewedCount(messages.length);
        }
        setIsOpen(!isOpen);
    };

    const unreadCount = Math.max(0, messages.length - viewedCount);

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="race-messages-wrapper" ref={wrapperRef}>
            <button className={`messages-tab-btn ${isOpen ? 'active' : ''}`} onClick={handleToggle} title="הודעות">
                <FaRegCommentDots className="msg-icon" />
                {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
            </button>

            {isOpen && (
                <div className="messages-dropdown-panel game-card">
                    <h3 className="messages-title">לוח הודעות</h3>

                    <div className="messages-list">
                        {messages.length === 0 ? (
                            <div className="empty-messages">אין הודעות מהמנהל</div>
                        ) : (
                            [...messages].reverse().map((msg, idx) => (
                                <div key={idx} className="message-item">
                                    <div className="message-header">
                                        <span className="message-sender">{msg.sender || 'מנהל'}</span>
                                        <span className="message-time">{formatTime(msg.timestamp)}</span>
                                    </div>
                                    <div className="message-text">{msg.text}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(RaceMessages);