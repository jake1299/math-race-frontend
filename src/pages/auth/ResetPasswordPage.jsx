import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/ui/Card.jsx";
import PasswordForm from "../../components/auth/PasswordForm.jsx";
import { AlertModal, ALERT_TYPES } from "../../components/ui/AlertModal.jsx";
import { resetPassword } from "../../services/authService.js";

function ResetPasswordPage() {
    const navigate = useNavigate();

    const { token } = useParams();
    const [alert, setAlert] = useState(null);

    const handleAction = async (password) => {
        try {
            const response = await resetPassword(password, token);

            if (response.success) {
                setAlert({
                    type: ALERT_TYPES.SUCCESS,
                    title: "Reset Successful",
                    message: "Your password has been reset. Please log in with your new password.",
                    onClose: () => navigate('/auth/login')
                });

                setTimeout(() => navigate('/auth/login'), 5000);
            } else {
                setAlert({
                    type: ALERT_TYPES.ERROR,
                    message: response.message
                });
            }
        } catch (err) {
            console.error(err);
            setAlert({
                type: ALERT_TYPES.ERROR,
                message: "Failed to reset password. The link might be expired."
            });
        }
    };

    return (
        <Card>
            <PasswordForm
                onSubmit={handleAction}
                header={
                    <>
                        <h2>Create New Password</h2>
                        <p>Enter your new password below to regain access to your account.</p>
                    </>
                }
                buttonText="Reset & Login"
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
    );
}

export default ResetPasswordPage;