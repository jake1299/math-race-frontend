import React, { memo } from 'react';
import { FaRegLightbulb } from "react-icons/fa6";
import './QuestionHint.css';

const QuestionHint = memo(({ hintText, isVisible }) => {
    if (!isVisible || !hintText) return null;

    return (
        <div className="hint-card-container">
            <div className="hint-card-icon">
                <FaRegLightbulb />
            </div>
            <div className="hint-card-content">
                <span className="hint-card-text">{hintText}</span>
            </div>
        </div>
    );
});

export default QuestionHint;