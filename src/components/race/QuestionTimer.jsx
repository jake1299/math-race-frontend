import React, { memo } from 'react';
import './QuestionTimer.css';

const QuestionTimer = memo(({ questionTimeLeft, totalTime, isQuestionActive }) => {
    const safeTimeLeft = (typeof questionTimeLeft === 'number' && !isNaN(questionTimeLeft)) ? questionTimeLeft : 0;
    const remainingSeconds = Math.ceil(safeTimeLeft / 1000);
    const formattedMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds % 60).padStart(2, '0');

    const safeTotalTime = totalTime > 0 ? totalTime : 1;
    const progressWidth = (safeTimeLeft / safeTotalTime) * 100;
    const isCriticalTime = progressWidth < 25;

    return (
        <div style={{ visibility: isQuestionActive ? 'visible' : 'hidden' }}>
            <div className="timer-wrapper">
                <div className="timer-labels">
                    <span className="timer-title">Time Left:</span>
                    <span className={`timer-clock ${isCriticalTime ? 'text-critical' : ''}`}>
                        {formattedMinutes}:{formattedSeconds}
                    </span>
                </div>
                <div className="timer-container">
                    <div className={`timer-bar ${isCriticalTime ? 'critical' : ''}`} style={{ width: `${Math.max(0, Math.min(100, progressWidth))}%` }} />
                </div>
            </div>
        </div>
    );
});

export default QuestionTimer;