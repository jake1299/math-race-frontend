import {useRef, useEffect} from 'react';
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import {useNavigate} from "react-router-dom";

function ProfileModal({onClose, user}) {
    const navigate = useNavigate();
    const dialogRef = useRef(null);

    const {username, email} = user;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}>
            <header>
                <h2>User Profile</h2>
                <Button onClick={onClose}>
                    &times;
                </Button>
            </header>

            <hr/>

            <section>
                <h3>Personal Information</h3>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
            </section>

            <hr/>

            <section>
                <h3>Activity</h3>
                <Card>
                    <h2>View Game History</h2>
                    <Button onClick={() => handleNavigation('/history')}>open</Button>
                </Card>
            </section>

            <hr/>

            <section>
                <h3>Account Settings</h3>
                <Button onClick={() => handleNavigation('/auth/change-password')}>
                    Change Password
                </Button>
                <Button>Logout</Button>
                <Button>Delete Account</Button>
            </section>
        </dialog>
    );
}

export default ProfileModal;