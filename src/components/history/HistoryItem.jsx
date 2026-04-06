import Card from "../ui/Card.jsx";
import { Link } from "react-router-dom";

function HistoryItem({ data }) {
    const { id, name, date, rank, playerCount, accuracy, avgSpeed } = data;

    return (
        <Card className="global-card" style={{ marginBottom: '20px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{name}</h3>
                    <small style={{ opacity: 0.7 }}>{new Date(date).toLocaleDateString()}</small>
                </div>
                <div style={{ background: '#eaeaea', color: '#333', padding: '5px 15px', borderRadius: '15px' }}>
                    <span style={{ fontWeight: 'bold' }}>Rank: {rank} / {playerCount}</span>
                </div>
            </div>

            <hr style={{ width: '100%', border: '1px solid #eee', margin: '15px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Accuracy</div>
                    <strong style={{ fontSize: '1.2rem' }}>{accuracy}%</strong>
                </div>
                <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Avg. Speed</div>
                    <strong style={{ fontSize: '1.2rem' }}>{avgSpeed}s</strong>
                </div>
            </div>

            <Link
                to={`/history/${id}`}
                style={{ textAlign: 'center', marginTop: '15px', display: 'block', fontWeight: 'bold' }}
            >
                View Full Analysis →
            </Link>
        </Card>
    );
}

export default HistoryItem;