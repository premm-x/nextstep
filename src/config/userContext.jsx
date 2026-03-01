import { createContext, useEffect, useState } from "react"


export const UserContext = createContext();

export function UserProvider({ children }) {

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const userLogout = () => {
        localStorage.removeItem("token");
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{ userData, setUserData, userLogout, loading, setLoading }} >
            {children}
        </UserContext.Provider>
    )

}