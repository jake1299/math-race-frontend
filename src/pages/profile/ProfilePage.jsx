import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import { myProfile } from "../../services/userProfileService.js";
import { ClipLoader } from "react-spinners";
import './ProfilePage.css';

function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await myProfile();

                // תמיכה בשני המצבים של התשובה מהשרת
                if (response && response.success && response.data) {
                    setUser(response.data);
                } else if (response && response.username) {
                    setUser(response);
                } else {
                    navigate('/auth/login');
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                navigate('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div className="loading-container"><ClipLoader color="#36d7b7" /></div>;
    }

    if (!user) return null;

    const { username, email } = user;

    return (
        <div className="profile-card-design">
            <div className="profile-avatar-large">
                {username ? username.substring(0, 1).toUpperCase() : '👤'}
            </div>
            <h2 className="profile-display-name">{username}</h2>
            <p className="profile-display-email">{email}</p>

            <div className="management-actions">
                <Button
                    className="btn-change-password"
                    onClick={() => navigate('/auth/change-password')}
                >
                    Change Password
                </Button>

                <Button
                    className="btn-delete-account"
                    onClick={() => {
                        if(window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                            // Delete logic
                        }
                    }}
                >
                    Delete Account
                </Button>
            </div>
        </div>
    );
}

export default ProfilePage;