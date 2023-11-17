import { createContext, useState } from "react";
import AuthService from "../service/Auth.Service";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>  {
    const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("user")))      //başta bu değer olmayacağı için false döner.

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password)       

            //response'un içinde access token var mı?
            if(response.access_token) {
                setIsAuth(JSON.parse(localStorage.getItem("user")))     //giriş yapılınca bu değer geleceği için true değeri döner.
                return true
            }
        } catch (error) {
            setIsAuth(false)
            return false
        }
    }

    const logout = () => {
        AuthService.logout()
        setIsAuth(false)
    }

    return(
        <AuthContext.Provider value={{isAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
