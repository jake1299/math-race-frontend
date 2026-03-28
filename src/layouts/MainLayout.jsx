import {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";

import './MainLayout.css'
import Button from "../components/ui/Button";
import ProfileModal from "../pages/profile/ProfileModal";

function MainLayout() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const user = {
        email: "exemple@example.com",
        username: "jon walker",
    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Button
                            onClick={() => setIsProfileOpen(true)}
                        >
                            Profile
                        </Button>
                    </li>
                </ul>
            </nav>
            <hr/>
            <main>
                <Outlet/>
            </main>

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

export default MainLayout;