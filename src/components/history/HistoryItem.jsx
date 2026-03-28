import Card from "../ui/Card.jsx";
import { Link } from "react-router-dom";

function HistoryItem({ data }) {
    const { id, name, date, rank, playerCount, accuracy, avgSpeed } = data;

    return (
        <Card>
            <div>
                <div>
                    <h3>{name}</h3>
                    <small>{new Date(date).toLocaleDateString()}</small>
                </div>
                <div>
                    <div>
                        Rank: {rank} / {playerCount}
                    </div>
                </div>
            </div>

            <hr/>

            <div>
                <div>
                    <span>Accuracy</span>
                    <strong>{accuracy}%</strong>
                </div>
                <div>
                    <span>Avg. Speed</span>
                    <strong>{avgSpeed}s</strong>
                </div>
            </div>

            <Link
                to={`/history/${id}`}
            >
                View Full Analysis →
            </Link>
        </Card>
    );
}

export default HistoryItem;