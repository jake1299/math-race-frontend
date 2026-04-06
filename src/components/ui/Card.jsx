import './Card.css';

function Card({ children, style, className, ...props }) {
    return (
        <div className={`game-card ${className || ''}`} style={style} {...props}>
            {children}
        </div>
    )
}

export default Card;