import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { AlertModal } from "../../components/ui/AlertModal.jsx";

function ProfileModal({ onClose, user }) {
    const navigate = useNavigate();
    const { username, email } = user;

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <AlertModal title="My Profile" onClose={onClose}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div
                    className="global-circle-avatar"
                    style={{ width: '80px', height: '80px', fontSize: '3rem', marginBottom: '10px', background: 'rgba(0,0,0,0.05)', color: '#333', borderColor: 'transparent' }}
                >
                    {username ? username.substring(0, 1).toUpperCase() : '👤'}
                </div>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{username}</h3>
                <p style={{ margin: 0, opacity: 0.7 }}>{email}</p>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', margin: '24px 0' }} />

            <div className="global-form-stack">
                <Button onClick={() => handleNavigation('/history')}>
                    View Game History
                </Button>
                <Button className="global-btn-secondary" onClick={() => handleNavigation('/auth/change-password')}>
                    Change Password
                </Button>

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <Button className="global-btn-danger" onClick={onClose}>
                        Logout
                    </Button>
                    <Button className="global-btn-outline-danger" onClick={onClose}>
                        Delete Account
                    </Button>
                </div>
            </div>
        </AlertModal>
    );
}

export default ProfileModal;