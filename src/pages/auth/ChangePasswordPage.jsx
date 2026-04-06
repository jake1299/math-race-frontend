import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import PasswordForm from "../../components/auth/PasswordForm.jsx"; // וודא שהנתיב נכון
import {AlertModal, ALERT_TYPES} from "../../components/ui/AlertModal.jsx";
import {changePassword} from "../../services/authService.js";

import './Auth.css'

function ChangePasswordPage() {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);

    const handleAction = async (password) => {
        try {
            const response = await changePassword(password);

            if (response.success) {
                setAlert({
                    type: ALERT_TYPES.SUCCESS,
                    title: "Success",
                    message: "Password changed successfully! You are being redirected home.",
                    onClose: () => navigate('/')
                });

                setTimeout(() => navigate('/'), 5000);
            } else {
                setAlert({
                    type: ALERT_TYPES.ERROR,
                    message: response.message || "Something went wrong"
                });
            }
        } catch (err) {
            console.error(err);
            setAlert({
                type: ALERT_TYPES.ERROR,
                message: "Server connection failed!"
            });
        }
    };

    return (
        <div  className="page-wrapper">
            <Card className="theme-red">
                <PasswordForm
                    onSubmit={handleAction}
                    header={
                        <>
                            <h2>Change The Password</h2>
                            <p>Choose a password (8-14 characters) to keep your account safe.</p>
                        </>
                    }
                    buttonText="Save Password"
                />

                {alert && (
                    <AlertModal
                        type={alert.type}
                        title={alert.title}
                        onClose={alert.onClose || (() => setAlert(null))}
                    >
                        <p>{alert.message}</p>
                    </AlertModal>
                )}
            </Card>
        </div>
    );
}

export default ChangePasswordPage;