import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import { publicRacesList } from "../../services/raceService.js";
import './PublicRacesPage.css';

function PublicRacesPage() {
    const navigate = useNavigate();

    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const SIZE = 10;

    const fetchRaces = async () => {
        setLoading(true);
        setError(false);
        try {
            const loc = { page: page, size: SIZE };
            const response = await publicRacesList(loc);

            if (response.success && response.data) {
                setRaces(response.data);
                setHasMore(response.data.length === SIZE);
            } else {
                setRaces([]);
                setHasMore(false);
            }
        } catch (err) {
            console.error("Failed to fetch public races:", err);
            setRaces([]);
            setHasMore(false);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRaces();
    }, [page]);

    const handleNextPage = () => {
        if (hasMore) setPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    const handleRefresh = () => {
        fetchRaces();
    };

    const handleJoinClick = (roomCode) => {
        navigate(`/race/join?code=${roomCode}`);
    };

    return (
        <div className="public-races-container">
            <Card className="card-public-list">
                <div className="public-list-header">
                    <h2>Active Public Races</h2>
                    <p>Join a live race below and compete with others.</p>
                </div>

                <div className="races-list-wrapper">
                    {loading ? (
                        <div className="loading-state">Loading active races...</div>
                    ) : error ? (
                        <div className="error-state" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔌</div>
                            <h3 style={{ color: '#d9534f', margin: '0 0 10px 0', fontSize: '20px' }}>
                                Connection Failed
                            </h3>
                            <p style={{ margin: '0 0 20px 0', color: '#666' }}>
                                Unable to connect to the server to load races.
                            </p>
                            <button
                                className="join-race-btn"
                                onClick={handleRefresh}
                                style={{ display: 'inline-block', padding: '8px 16px' }}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : races.length === 0 ? (
                        <div className="empty-state">
                            No active public races at the moment.
                        </div>
                    ) : (
                        <ul className="races-list">
                            {races.map((race) => (
                                <li key={race.roomCode} className="race-item">
                                    <div className="race-info">
                                        <h3 className="race-name">{race.name}</h3>
                                        <span className="race-details">
                                            Host: <strong>{race.hostNickname}</strong> • Target: <strong>{race.targetScore}</strong> • Players: <strong>{race.participants}</strong>
                                        </span>
                                    </div>
                                    <button
                                        className="join-race-btn"
                                        onClick={() => handleJoinClick(race.roomCode)}
                                    >
                                        Join
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="pagination-controls">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 0 || loading}
                        className="page-btn"
                    >
                        &larr; Prev
                    </button>

                    <div className="page-indicator-wrapper">
                        <span className="page-indicator">Page {page + 1}</span>
                        <button
                            className="refresh-icon-btn"
                            onClick={handleRefresh}
                            disabled={loading}
                            title="Refresh list"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={!hasMore || loading}
                        className="page-btn"
                    >
                        Next &rarr;
                    </button>
                </div>
            </Card>
        </div>
    );
}

export default PublicRacesPage;