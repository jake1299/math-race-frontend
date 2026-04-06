import HistoryItem from "./HistoryItem.jsx";

function HistoryList({games}) {
    return (
        <div >
            {games.map((game) => (
                <HistoryItem key={game.id} data={game}/>
            ))}
        </div>
    )
}

export default HistoryList;