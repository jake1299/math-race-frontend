import React, { memo } from 'react';
import './Race.css';

const RaceHeader = memo(({ name, roomCode }) => {
    return (
        <header className="race-lobby-header">
            <h1 style={{ margin: '0 0 10px 0' }}>{name}</h1>
            <p>Invite players to join using the code:</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '4px' }}>
                {roomCode}
            </div>
        </header>
    );
});

const PlayerCard = memo(({ player }) => {
    const isOnline = player.online;

    return (
        <div className="race-player-avatar-wrapper">
            <div className="global-circle-avatar" style={{ borderColor: isOnline ? '#4CAF50' : '#ccc' }}>
                {player.nickname.substring(0, 1).toUpperCase()}
            </div>
            <span style={{ fontWeight: 'bold' }}>{player.nickname}</span>
        </div>
    );
});

function RaceLobby({ raceState, onStartRace, isHost }) {
    return (
        <div className="race-lobby-container">
            <RaceHeader name={raceState.name} roomCode={raceState.roomCode} />

            <div style={{ flexGrow: 1 }}>
                <h3 style={{ textAlign: 'center' }}>
                    Players in Lobby: {raceState.players.length}
                </h3>

                {raceState.players.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No players in the room yet. Waiting...</p>
                ) : (
                    <div className="race-players-grid">
                        {raceState.players.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                )}
            </div>

            {isHost ? (
                <footer className="race-admin-panel">
                    <div>
                        <h4 style={{ margin: 0 }}>Admin Panel</h4>
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Host Controls</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="global-btn" onClick={onStartRace} disabled={raceState.players.length === -1}>
                            Start the Race!
                        </button>
                    </div>
                </footer>
            ) : (
                <footer className="race-admin-panel" style={{ justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>Waiting for the host to start the game...</p>
                </footer>
            )}
        </div>
    );
}

export default RaceLobby;