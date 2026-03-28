import { useNavigate } from "react-router-dom";
import HistoryList from "../../components/history/HistoryList.jsx";
import Button from "../../components/ui/Button.jsx";

function GameHistoryPage() {
    const navigate = useNavigate();

    const games = [
        { id: 1, name: "Math Speed Race", date: "2026-03-05", rank: 1, playerCount: 30, accuracy: 95, avgSpeed: 1.2 },
        { id: 2, name: "Logic Champions", date: "2026-03-02", rank: 17, playerCount: 30, accuracy: 70, avgSpeed: 2.5 },
        { id: 3, name: "Final Boss Battle", date: "2026-02-28", rank: 28, playerCount: 30, accuracy: 40, avgSpeed: 4.1 }
    ];

    return (
        <div>
            <div>
                <h2>Race History</h2>
                <Button type="button" onClick={() => navigate("/")}>
                    Back to Dashboard
                </Button>
            </div>

            {games.length > 0 ? (
                <HistoryList games={games} />
            ) : (
                <div>
                    <p>You haven't participated in any races yet.</p>
                    <Button onClick={() => navigate("/race/join")}>Join Your First Race</Button>
                </div>
            )}
        </div>
    );
}

export default GameHistoryPage;