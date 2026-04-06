import './Button.css';
function Button({ children, style, className, ...props }) {
    return (
        <button className={`global-btn ${className || ''}`} style={style} {...props}>
            {children}
        </button>
    )
}

export default Button;