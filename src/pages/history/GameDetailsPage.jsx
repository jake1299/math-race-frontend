import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

function GameDetailsPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    return (
        <div >
            <div>
                <Button  onClick={() => navigate("/history")}>
                    ← Back to History
                </Button>
            </div>

            <Card >
                <h2 >Race Performance Analysis</h2>
                <p>Detailed stats for Race ID: <strong>{gameId}</strong></p>

                <div  >
                    <div  >
                        <div >Total Questions</div>
                        <strong >20</strong>
                    </div>
                    <div  >
                        <div >Correct Answers</div>
                        <strong >18</strong>
                    </div>
                    <div  >
                        <div >Best Speed</div>
                        <strong >0.8s</strong>
                    </div>
                </div>
            </Card>

            <div >
                <h3>Question Breakdown</h3>
                <p >Coming soon: Detailed per-question analysis...</p>
            </div>
        </div>
    );
}

export default GameDetailsPage;