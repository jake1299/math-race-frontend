import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {

    return (
        <>
            <main >
                <div >
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default MainLayout;