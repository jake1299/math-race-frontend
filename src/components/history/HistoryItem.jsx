import Card from "../ui/Card.jsx";
import { Link } from "react-router-dom";

function HistoryItem({ data }) {
    const { id, name, date, rank, playerCount, accuracy, avgSpeed } = data;

    return (
        <Card  >
            <div >
                <div>
                    <h3 >{name}</h3>
                    <small >{new Date(date).toLocaleDateString()}</small>
                </div>
                <div >
                    <span >Rank: {rank} / {playerCount}</span>
                </div>
            </div>

            <hr  />

            <div >
                <div>
                    <div >Accuracy</div>
                    <strong >{accuracy}%</strong>
                </div>
                <div>
                    <div >Avg. Speed</div>
                    <strong >{avgSpeed}s</strong>
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