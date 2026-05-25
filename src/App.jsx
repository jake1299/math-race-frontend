import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import JoinRacePage from "./pages/race/JoinRacePage.jsx";
import VerifyAccountPage from "./pages/auth/VerifyAccountPage.jsx";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage.jsx";
import WebSocketProvider from "./services/webSocket/WebSocketProvider.jsx";
import CreateRacePage from "./pages/race/CreateRacePage.jsx";
import GameHistoryPage from "./pages/history/GameHistoryPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ManageProfileLayout from "./layouts/ManageProfileLayout.jsx";
import StatisticsPage from "./pages/statistics/StatisticsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RaceHostPage from "./pages/race/RaceHostPage.jsx";
import RacePlayerPage from "./pages/race/RacePlayerPage.jsx";
import { cookieService } from "./services/cookieService.js";
import PublicRacesPage from "./pages/dashboard/PublicRacesPage.jsx";

const CookieProtectedRoute = () => {
    const hasToken = cookieService.getAuthToken();
    return hasToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

function App() {
    return (
        <WebSocketProvider>
            <BrowserRouter>
                <Routes>

                    <Route path={"/auth"}>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"register"} element={<RegisterPage/>}/>
                        <Route path={"forgot-password"} element={<ForgotPasswordPage/>}/>
                        <Route path={"change-password"} element={<ChangePasswordPage/>}/>
                        <Route path={"reset-password/:token"} element={<ResetPasswordPage/>}/>
                        <Route path={"verify/:token"} element={<VerifyAccountPage/>}/>
                    </Route>

                    <Route path={"/race"}>
                        <Route path="join" element={<JoinRacePage/>}/>
                        <Route element={<CookieProtectedRoute />}>
                            <Route path="create" element={<CreateRacePage/>}/>
                        </Route>
                        <Route element={<CookieProtectedRoute/>}>
                            <Route path=":roomCode/host" element={<RaceHostPage/>}/>
                        </Route>
                        <Route path=":roomCode/player" element={<RacePlayerPage/>}/>
                    </Route>

                    <Route element={<MainLayout/>}>
                        <Route path={"/"} element={<DashboardPage />}/>
                        <Route path={"/public-races"} element={<PublicRacesPage />}/>
                    </Route>

                    <Route element={<CookieProtectedRoute />}>
                        <Route path={"/manage-profile"} element={<ManageProfileLayout/>}>
                            <Route index element={<ProfilePage />}/>
                            <Route path="history" element={<GameHistoryPage/>}/>
                            <Route path="statistics" element={<StatisticsPage/>}/>
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </BrowserRouter>
        </WebSocketProvider>
    );
}

export default App;