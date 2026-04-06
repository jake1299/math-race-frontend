import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "../profile/ProfileModal.jsx";

function DashboardPage() {
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const user = {
        email: "exemple@example.com",
        username: "jon walker",
    }

    const handleSubmit = (e) => {
        navigate("/race/" + e.target.name);
    }

    return (
        <>
            <div style={{ width: '100%' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ margin: 0 }}>Math Race</h1>
                    <button
                        className="global-circle-avatar"
                        style={{ cursor: 'pointer', background: 'transparent', padding: 0, outline: 'none', transition: 'transform 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => setIsProfileOpen(true)}
                        title="Profile"
                    >
                        {user.username ? user.username.substring(0, 1).toUpperCase() : '👤'}
                    </button>
                </header>

                <div className="global-grid-2-cols">
                    <Card>
                        <h2 style={{ margin: 0 }}>Create a Race</h2>
                        <p style={{ flexGrow: 1 }}>
                            Create a new room and select your preferred difficulty level. Share the unique code with others
                            so they can join, and watch the race unfold in real time.
                        </p>
                        <Button className="global-btn-success" name={"create"} onClick={handleSubmit}>Create Race</Button>
                    </Card>

                    <Card>
                        <h2 style={{ margin: 0 }}>Join the Race</h2>
                        <p style={{ flexGrow: 1 }}>
                            Got a room code? Then what are you waiting for! Click the button below, follow the instructions,
                            and start playing!
                        </p>
                        <Button className="global-btn-secondary" name={"join"} onClick={handleSubmit}>Join Race</Button>
                    </Card>
                </div>
            </div>

            {
                isProfileOpen && (
                    <ProfileModal
                        onClose={() => setIsProfileOpen(false)}
                        user={user}
                    />
                )
            }
        </>
    )
}

export default DashboardPage;