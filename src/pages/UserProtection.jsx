import { UserContext } from "@/config/UserContext";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function UserProtection () {

    const { userData, setUserData, userLogout, loading, setLoading } = useContext(UserContext);

    useEffect(() => {
        const checkAuth = async () => {

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, { headers: { Authorization: `Bearer ${token}`, }, });

                setUserData(res.data);

            } catch (err) {
                userLogout();
                console.log(err)

            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-background text-primary">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <h2 className="text-xl font-medium animate-pulse">Loading...</h2>
                </div>
            </div>
        );
    }


    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>  ;
};
