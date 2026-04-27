import React, {useEffect, useRef, useState} from 'react';
import { useWebSocket } from "../../services/webSocket/WebSocketContext.js";
import './RaceActiveHost.css';
import RaceHeaderHost from "./RaceHeaderHost.jsx";
import TrackGroup from './TrackGroup.jsx';

function RaceActiveHost({ raceState, joinToken, onKickPlayer, onSendMessageToPlayer, onPauseRace, onResumeRace, onCancelRace }) {
    const { isConnected, subscribe } = useWebSocket();
    const [livePlayers, setLivePlayers] = useState(raceState.players);
    const [localTimeLeft, setLocalTimeLeft] = useState(raceState.remainingTimeMs);
    const endTimeRef = useRef(0);
    const lastSyncTimeRef = useRef(raceState.receivedAt || 0);

    useEffect(() => {
        if (raceState.status === 'IN_PROGRESS') {
            const receivedTime = raceState.receivedAt || Date.now();
            endTimeRef.current = receivedTime + raceState.remainingTimeMs;
        } else {
            setLocalTimeLeft(raceState.remainingTimeMs);
        }
    }, [raceState.remainingTimeMs, raceState.status, raceState.receivedAt]);

    useEffect(() => {
        if (raceState.status !== 'IN_PROGRESS') return;

        let intervalId;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = Math.max(0, endTimeRef.current - now);

            setLocalTimeLeft(prevTime => {
                if (Math.floor(prevTime / 1000) !== Math.floor(remaining / 1000) || remaining <= 0) {
                    return remaining;
                }
                return prevTime;
            });

            if (remaining <= 0) {
                clearInterval(intervalId);
            }
        };

        updateTimer();
        intervalId = setInterval(updateTimer, 100);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateTimer();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [raceState.status]);

    useEffect(() => {
        const isFullSync = raceState.receivedAt !== lastSyncTimeRef.current;
        if (isFullSync) {
            lastSyncTimeRef.current = raceState.receivedAt;
        }

        setLivePlayers(prevLive => {
            return raceState.players.map(parentPlayer => {
                const existing = prevLive.find(p => p.id === parentPlayer.id);

                if (existing) {
                    if (isFullSync) {
                        return {
                            ...existing,
                            ...parentPlayer,
                            bubbleEvent: existing.bubbleEvent,
                            clearInputTrigger: existing.clearInputTrigger
                        };
                    } else {
                        return {
                            ...existing,
                            online: parentPlayer.online,
                            nickname: parentPlayer.nickname,
                            currentScore: Math.max(existing.currentScore || 0, parentPlayer.currentScore || 0)
                        };
                    }
                }
                return parentPlayer;
            });
        });
    }, [raceState.players, raceState.receivedAt]);

    useEffect(() => {
        if (!isConnected) return;
        const queue = `/user/queue/race/host`;

        const unsubscribe = subscribe(queue, (data) => {
            setLivePlayers(prevPlayers => {
                const targetPlayerId = data.type === 'NEW_HOST_MESSAGE' ? data.data.to : data.data.playerId;

                return prevPlayers.map(p => {
                    if (p.id !== targetPlayerId) return p;

                    const updatedPlayer = { ...p };
                    const bubbleId = Date.now();

                    switch (data.type) {
                        case 'NEW_HOST_MESSAGE':
                            updatedPlayer.bubbleEvent = { type: 'MESSAGE', id: bubbleId };
                            updatedPlayer.clearInputTrigger = bubbleId;
                            break;
                        case 'PLAYER_ANSWERED_CORRECTLY':
                            updatedPlayer.currentScore += data.data.score;
                            updatedPlayer.currentQuestion = null;
                            updatedPlayer.bubbleEvent = { type: 'CORRECT', id: bubbleId };
                            break;
                        case 'PLAYER_ANSWERED_INCORRECTLY':
                            updatedPlayer.currentScore += data.data.score;
                            updatedPlayer.currentQuestion = null;
                            updatedPlayer.bubbleEvent = { type: 'INCORRECT', id: bubbleId };
                            break;
                        case 'PLAYER_TIMEOUT':
                            updatedPlayer.currentScore += data.data.score;
                            updatedPlayer.currentQuestion = null;
                            updatedPlayer.bubbleEvent = { type: 'TIMEOUT', id: bubbleId };
                            break;
                        case 'QUESTION_SENT':
                            updatedPlayer.currentQuestion = {
                                expression: data.data.expression,
                                options: data.data.options,
                                timeLimitMillis: data.data.timeLimitMillis,
                                questionRemainingTimeMillis: data.data.questionRemainingTimeMillis,
                                score: data.data.score,
                                receivedAt: Date.now()
                            };
                            updatedPlayer.currentJunction = null;
                            updatedPlayer.bubbleEvent = { type: 'QUESTION', id: bubbleId };
                            break;
                        case 'JUNCTION_OFFERED_TO_PLAYER':
                            updatedPlayer.trackState = data.data.state;
                            updatedPlayer.currentJunction = {
                                expression: data.data.expression,
                                offer1: data.data.offer1,
                                offer2: data.data.offer2,
                                timeLimitMillis: data.data.timeLimitMillis,
                                questionRemainingTimeMillis: data.data.questionRemainingTimeMillis,
                                receivedAt: Date.now()
                            };
                            updatedPlayer.currentQuestion = null;
                            updatedPlayer.bubbleEvent = { type: 'JUNCTION', id: bubbleId };
                            break;
                        case 'TRACK_STATE_CHANGED_FOR_PLAYER':
                        case 'JUNCTION_CHOOSE_FOR_PLAYER':
                        case 'JUNCTION_TIMEOUT_FOR_PLAYER':
                            updatedPlayer.trackState = data.data.state;
                            updatedPlayer.currentJunction = null;
                            break;
                        default:
                            return p;
                    }
                    return updatedPlayer;
                });
            });
        }, joinToken);

        return () => { if (unsubscribe) unsubscribe(); };
    }, [isConnected, subscribe, joinToken]);

    const tracks = { AUTOSTRADA: [], REGULAR: [], DIRT_ROAD: [] };
    livePlayers.forEach(p => {
        const currentTrack = p.trackState === 'WAITING_FOR_CHOICE' ? 'REGULAR' : (p.trackState || 'REGULAR');
        if (tracks[currentTrack]) {
            tracks[currentTrack].push(p);
        }
    });

    const [highlightedPlayerId, setHighlightedPlayerId] = useState(null);

    const handleHighlightPlayer = (playerId) => {
        setHighlightedPlayerId(playerId);
        setTimeout(() => {
            setHighlightedPlayerId(null);
        }, 2000);
    };

    return (
        <div>
            <RaceHeaderHost
                raceState={raceState}
                livePlayers={livePlayers}
                localTimeLeft={localTimeLeft}
                onPlayerClick={handleHighlightPlayer}
                onKickPlayer={onKickPlayer}
                onPauseRace={onPauseRace}
                onResumeRace={onResumeRace}
                onCancelRace={onCancelRace}
                roomCode={raceState.roomCode}
            />

            <div className="race-arena">
                <TrackGroup
                    trackType="AUTOSTRADA"
                    players={tracks.AUTOSTRADA}
                    targetScore={raceState.targetScore}
                    highlightedPlayerId={highlightedPlayerId}
                    onSendMessageToPlayer={onSendMessageToPlayer}
                    raceStatus={raceState.status}
                />
                <TrackGroup
                    trackType="REGULAR"
                    players={tracks.REGULAR}
                    targetScore={raceState.targetScore}
                    highlightedPlayerId={highlightedPlayerId}
                    onSendMessageToPlayer={onSendMessageToPlayer}
                    raceStatus={raceState.status}
                />
                <TrackGroup
                    trackType="DIRT_ROAD"
                    players={tracks.DIRT_ROAD}
                    targetScore={raceState.targetScore}
                    highlightedPlayerId={highlightedPlayerId}
                    onSendMessageToPlayer={onSendMessageToPlayer}
                    raceStatus={raceState.status}
                />
            </div>
        </div>
    );
}

export default RaceActiveHost;