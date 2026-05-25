import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileModal from "../pages/profile/ProfileModal.jsx";
import { myProfile } from "../services/userProfileService.js";
import logo from '../assets/logo.png';
import './MainLayout.css'; // ניצור קובץ עיצוב ללייאוט

function MainLayout() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await myProfile();
                if (response && response.success && response.data) {
                    setUser(response.data);
                } else if (response && response.username) {
                    setUser(response);
                }
            } catch (error) {
                console.log("User is acting as a guest or not logged in.");
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="main-layout-wrapper">
            <header className="dashboard-header">
                <button
                    className="profile-btn"
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setIsProfileOpen(true)}
                    title="Profile"
                >
                    {user ? user.username.substring(0, 1).toUpperCase() : 'G'}
                </button>
                <img src={logo} alt="Math Race Logo" className="dashboard-logo" />
            </header>

            <nav className="main-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
                    Play
                </NavLink>

                <NavLink to="/public-races" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Public Races
                </NavLink>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>

            {isProfileOpen && (
                <ProfileModal
                    onClose={() => setIsProfileOpen(false)}
                    user={user}
                    onLogout={() => setUser(null)}
                />
            )}
        </div>
    )
}

export default MainLayout;