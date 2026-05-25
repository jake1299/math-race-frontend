import React, { memo } from 'react';
import { FaLightbulb } from "react-icons/fa6";
import './RaceFlipCard.css';

export let TRACK_INFO;
TRACK_INFO = {
    REGULAR: {text: "Regular Track", color: "var(--blue)"},
    WAITING_FOR_CHOICE: {text: "Crossroads", color: "var(--yellow)"},
    AUTOSTRADA: {text: "Autostrada", color: "var(--red)"},
    DIRT_ROAD: {text: "Dirt Road", color: "var(--green)"}
};

const TrackBadge = ({ trackState, currentQ, totalQ }) => {
    const info = TRACK_INFO[trackState] || TRACK_INFO.REGULAR;
    return (
        <div className="track-state-badge" style={{ backgroundColor: info.color }}>
            {info.text}
            {currentQ && totalQ ? ` (${currentQ}/${totalQ})` : ''}
        </div>
    );
};


const RaceFlipCard = memo(({ flipCount, faces, feedbackType, scoreDiff, onHintClick, canRequestHint, hasHintAlready,isPaused }) => {

    const renderFace = (content) => {
        if (!content) return null;

        if (content.type === 'QUESTION') {
            const isJunc = !!content.data?.offer1;

            return (
                <>
                    <TrackBadge trackState={content.track} currentQ={content.currentQ} totalQ={content.totalQ} />

                    {!isJunc && content.data?.score && (
                        <div className="points-tag">{content.data.score} pts</div>
                    )}

                    {!isJunc && !hasHintAlready && (
                        <button
                            className="hint-btn"
                            onClick={onHintClick}
                            disabled={!canRequestHint || isPaused}
                            title={!canRequestHint ? "רמז לא זמין בשאלה זו" : (isPaused ? "המירוץ מושהה" : "קבל רמז")}
                        >
                            <FaLightbulb /> Hint
                        </button>
                    )}

                    <div className="question-text">{content.data?.expression}</div>
                </>
            );
        }

        if (content.type === 'RETURN_TRACK') {
            return (
                <>
                    <TrackBadge trackState="REGULAR" />
                    <div className="returned-track-msg">
                        The special track has ended.<br/>You returned to the main track!
                    </div>
                </>
            );
        }

        return (
            <>
                <TrackBadge trackState={content.track} currentQ={content.currentQ} totalQ={content.totalQ} />
                <div className="feedback-content">
                    {feedbackType === 'waiting' ? (
                        <div className="feedback-status text-neutral">Waiting for next question...</div>
                    ) : feedbackType === 'junction-chosen' ? (
                        <div className="feedback-status text-neutral">Preparing for track...</div>
                    ) : (
                        <>
                            <div className={`feedback-status text-${feedbackType}`}>
                                {feedbackType === 'positive' ? 'Correct!' : feedbackType === 'negative' ? 'Wrong' : "Time's up"}
                            </div>
                            {feedbackType !== 'timeout' && (
                                <div className={`feedback-score-anim text-${feedbackType}`}>
                                    {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        );
    };

    const isFace0Active = flipCount % 2 === 0;

    return (
        <div className="flip-card-container">
            <div className="flip-card-inner" style={{ transform: `rotateY(${flipCount * 180}deg)` }}>
                <div
                    className="flip-card-face face-0"
                    style={{ pointerEvents: isFace0Active ? 'auto' : 'none' }}
                >
                    {renderFace(faces.face0)}
                </div>
                <div
                    className="flip-card-face face-1"
                    style={{ pointerEvents: !isFace0Active ? 'auto' : 'none' }}
                >
                    {renderFace(faces.face1)}
                </div>
            </div>
        </div>
    );
});

export default RaceFlipCard;