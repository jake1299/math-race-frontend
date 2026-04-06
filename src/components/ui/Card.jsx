import './Card.css';
function Card({ children, style, className, ...props }) {
    return (
        <div className={`global-card ${className || ''}`} style={style} {...props}>
            {children}
        </div>
    )
}

export default Card;