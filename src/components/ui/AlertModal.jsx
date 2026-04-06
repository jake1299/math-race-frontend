import './AlertModal.css';
import { useRef, useEffect } from 'react';

const ALERT_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}

function AlertModal({ type = ALERT_TYPES.INFO, title, children, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            className="global-dialog"
        >
            <button
                className="global-dialog-close-btn"
                onClick={() => {
                    dialogRef.current?.close();
                }}
            >
                ✕
            </button>

            <h2 style={{ marginTop: 0 }}>{title}</h2>

            <div>
                {children}
            </div>
        </dialog>
    );
}

export {
    ALERT_TYPES,
    AlertModal,
}