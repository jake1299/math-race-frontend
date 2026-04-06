import React, { memo } from 'react';
import './Race.css';

const PlayerRow = memo(({ player, targetScore }) => {

    const progress = Math.min((player.currentScore / targetScore) * 100, 100);

    return (
        <div className="race-host-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.2rem' }}>{player.nickname}</strong>
                <span>{player.currentScore} points</span>
            </div>

            <div className="race-progress-bar-container">
                <div
                    className="race-progress-filler"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
});

function RaceActiveHost({ raceState }) {
    return (
        <div className="race-active-container">
            <header className="race-lobby-header">
                <h1 style={{ margin: '0 0 10px 0' }}>{raceState.name} - The Race is On!</h1>
                <h3 style={{ opacity: 0.8 }}>Target Score to Win: {raceState.targetScore}</h3>
            </header>

            <div style={{ width: '100%', maxWidth: '800px', marginTop: '20px' }}>
                {raceState.players.map(player => (
                    <PlayerRow
                        key={player.id}
                        player={player}
                        targetScore={raceState.targetScore}
                    />
                ))}
            </div>
        </div>
    );
}

export default RaceActiveHost;