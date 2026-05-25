import React, { memo } from 'react';
import './QuestionOptions.css';
import { TRACK_INFO } from './RaceFlipCard';

const BUTTON_COLORS = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow'];

const QuestionOptions = memo(({ isQuestionActive, isJunctionView, activeEvent, isSubmitting, questionTimeLeft, onAnswer, onChooseJunction }) => {
    if (!isQuestionActive || !activeEvent) return <div className="options-wrapper" />;

    const getTrackName = (offerCode) => {
        return TRACK_INFO[offerCode]?.text || offerCode;
    };

    return (
        <div className="options-wrapper">
            <div className="options-grid">
                {isJunctionView ? (
                    <>
                        <button className="option-btn bg-red" disabled={isSubmitting || questionTimeLeft <= 0} onClick={() => onChooseJunction(activeEvent.offer1)}>
                            {getTrackName(activeEvent.offer1)}
                            <span className="btn-desc">High risk, fast progress</span>
                        </button>
                        <button className="option-btn bg-green" disabled={isSubmitting || questionTimeLeft <= 0} onClick={() => onChooseJunction(activeEvent.offer2)}>
                            {getTrackName(activeEvent.offer2)}
                            <span className="btn-desc">Safe and steady</span>
                        </button>
                    </>
                ) : (
                    activeEvent.options.map((opt, i) => (
                        <button
                            key={i}
                            className={`option-btn ${BUTTON_COLORS[i % 4]}`}
                            onClick={() => onAnswer(opt)}
                            disabled={isSubmitting || questionTimeLeft <= 0}
                        >
                            {opt}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
});

export default QuestionOptions;