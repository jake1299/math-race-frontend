import React from 'react';


function RaceResults({ players }) {
    const sortedPlayers = [...players].sort((a, b) => b.currentScore - a.currentScore);

    return (
        <div >
            <header >
                <h1 >Race Finished!</h1>
                <h2>Final Standings</h2>
            </header>

            <div >
                {sortedPlayers.map((player, index) => {
                    let positionStyle = {};
                    let badge = '';
                    if (index === 0) { positionStyle = { borderColor: '#ffd700', transform: 'scale(1.05)' }; badge = '🥇'; }
                    else if (index === 1) { positionStyle = { borderColor: '#c0c0c0' }; badge = '🥈'; }
                    else if (index === 2) { positionStyle = { borderColor: '#cd7f32' }; badge = '🥉'; }

                    return (
                        <div key={player.id}  >
                            <div >
                                <span >{badge || `${index + 1}.`}</span>
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