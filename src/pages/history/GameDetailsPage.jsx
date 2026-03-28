import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

function GameDetailsPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <Button onClick={() => navigate("/history")}>
                ← Back to History
            </Button>

            <Card>
                <h2>Race Performance Analysis</h2>
                <p>Detailed stats for Race ID: <strong>{gameId}</strong></p>

                <div>
                    <div>
                        <span>Total Questions:</span>
                        <strong>20</strong>
                    </div>
                    <div>
                        <span>Correct Answers:</span>
                        <strong>18</strong>
                    </div>
                    <div>
                        <span>Best Speed:</span>
                        <strong>0.8s</strong>
                    </div>
                </div>
            </Card>

            <h3>Question Breakdown</h3>
            <p>Coming soon: Detailed per-question analysis...</p>
        </div>
    );
}

export default GameDetailsPage;