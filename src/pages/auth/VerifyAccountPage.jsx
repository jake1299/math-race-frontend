import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { verifyAccount } from "../../services/authService.js";
import { ClipLoader } from "react-spinners";

function VerifyAccountPage() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('Verifying your account...');

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await verifyAccount(token);

                if (response.success === true) {
                    setStatus('success');
                    setMessage('Account verified successfully! Redirecting to login...');

                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 3000);

                } else {
                    setStatus('error');
                    setMessage('The link is invalid or has expired.');
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setStatus('error');
                setMessage('Connection error. Please try again later.');
            }
        };

        if (token) {
            checkToken();
        }
    }, [navigate, token]);

    return (
        <>
            <div>
                <h2>Account Verification</h2>

                <div>
                    {
                        status === 'loading' && (
                            <div>
                                <ClipLoader />
                            </div>
                        )
                    }

                    <p>{message}</p>
                </div>

            </div>
        </>
    );
}

export default VerifyAccountPage;