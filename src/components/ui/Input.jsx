import './Input.css';

function Input({ style, ...props }) {
    return (
        <div >
            <input style={style} {...props} />
        </div>
    )
}

export default Input;