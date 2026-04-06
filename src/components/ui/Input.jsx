import './Input.css';
function Input({ style, className, ...props }) {
    return (
        <div className="global-input-container">
            <input className={`global-input ${className || ''}`} style={style} {...props} />
        </div>
    )
}

export default Input;