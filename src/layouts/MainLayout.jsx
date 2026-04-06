import { NavLink, Outlet } from "react-router-dom";

import './MainLayout.css'

function MainLayout() {

    return (
        <>
            <main className="global-center-container">
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default MainLayout;