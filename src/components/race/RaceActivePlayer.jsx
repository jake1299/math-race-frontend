import React, { memo, useState, useEffect } from 'react';
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";
import './Race.css';

function RaceActivePlayer({ raceState, accountId, onAnswerQuestion }) {
    const player = raceState.players.find(p => p.id === accountId);
    const question = player?.currentQuestion;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!question || question.questionRemainingTimeMillis == null) return;

        setIsSubmitting(false);

        const endTime = Date.now() + question.questionRemainingTimeMillis;
        let intervalId;

        const updateTimer = () => {
            const remaining = Math.max(0, endTime - Date.now());
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(intervalId);
            }
        };

        updateTimer();

        intervalId = setInterval(updateTimer, 100);

        return () => clearInterval(intervalId);

    }, [question]);

    if (!player) return <div>Loading player data...</div>;
    if (!question) return <div>Waiting for the next question...</div>;

    const remainingSeconds = Math.ceil(timeLeft / 1000);
    const formattedMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds % 60).padStart(2, '0');
    const isTimeUp = timeLeft <= 0;

    return (
        <div className="race-active-container">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', opacity: 0.8, fontSize: '0.9rem' }}>
                <span>{raceState.name} | target: {raceState.targetScore}</span>
                <span>{player.nickname} | score: {player.currentScore}</span>
            </div>

            <div className={`race-timer-pill ${isTimeUp ? 'blink-red' : ''}`}>
                {formattedMinutes}:{formattedSeconds}
            </div>

            <Card className="race-question-card">
                {question.expression}
            </Card>

            <div className="race-options-grid">
                {
                    question.options.map((option, index) => (
                        <Button
                            key={index}
                            className="race-option-btn"
                            onClick={() => {
                                setIsSubmitting(true);
                                onAnswerQuestion(option);
                            }}
                            disabled={isTimeUp || isSubmitting}
                        >
                            {option}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
}

export default memo(RaceActivePlayer);