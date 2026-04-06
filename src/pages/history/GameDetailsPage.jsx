import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

function GameDetailsPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
                <Button style={{ width: 'auto' }} onClick={() => navigate("/history")}>
                    ← Back to History
                </Button>
            </div>

            <Card style={{ alignItems: 'stretch' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>Race Performance Analysis</h2>
                <p>Detailed stats for Race ID: <strong>{gameId}</strong></p>

                <div className="global-grid-2-cols" style={{ marginTop: '20px' }}>
                    <div className="global-card" style={{ padding: '20px', background: 'rgba(128,128,128,0.1)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Questions</div>
                        <strong style={{ fontSize: '1.5rem' }}>20</strong>
                    </div>
                    <div className="global-card" style={{ padding: '20px', background: 'rgba(128,128,128,0.1)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Correct Answers</div>
                        <strong style={{ fontSize: '1.5rem' }}>18</strong>
                    </div>
                    <div className="global-card" style={{ padding: '20px', background: 'rgba(128,128,128,0.1)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Best Speed</div>
                        <strong style={{ fontSize: '1.5rem' }}>0.8s</strong>
                    </div>
                </div>
            </Card>

            <div style={{ textAlign: 'center' }}>
                <h3>Question Breakdown</h3>
                <p style={{ opacity: 0.7 }}>Coming soon: Detailed per-question analysis...</p>
            </div>
        </div>
    );
}

export default GameDetailsPage;