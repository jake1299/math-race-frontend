import React from 'react';
import './Race.css';

function RaceResults({ players }) {
    const sortedPlayers = [...players].sort((a, b) => b.currentScore - a.currentScore);

    return (
        <div className="race-active-container">
            <header className="race-lobby-header">
                <h1 style={{ margin: '0 0 10px 0' }}>Race Finished!</h1>
                <h2>Final Standings</h2>
            </header>

            <div className="race-results-podium">
                {sortedPlayers.map((player, index) => {
                    let positionStyle = {};
                    let badge = '';
                    if (index === 0) { positionStyle = { borderColor: '#ffd700', transform: 'scale(1.05)' }; badge = '🥇'; }
                    else if (index === 1) { positionStyle = { borderColor: '#c0c0c0' }; badge = '🥈'; }
                    else if (index === 2) { positionStyle = { borderColor: '#cd7f32' }; badge = '🥉'; }

                    return (
                        <div key={player.id} className="race-result-row global-card" style={{ ...positionStyle, flexDirection: 'row', padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.5rem' }}>{badge || `${index + 1}.`}</span>
                                <span>{player.nickname}</span>
                            </div>
                            <span>{player.currentScore} Points</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RaceResults;