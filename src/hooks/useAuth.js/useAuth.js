import { useContext, useDebugValue } from "react"
import AuthContext from "../../context/authContext"

export default function useAuth() {
    const authContext = useContext(AuthContext)
    const auth = authContext.isAuthenticated

    useDebugValue(auth ? 'Zalogowany' : 'Wylogowany')

    const setAuth = (value) => {
        if(value) {
            authContext.login(value)
            window.localStorage.setItem('token-data', JSON.stringify(value))
        }
        else {
            authContext.logout()
            window.localStorage.removeItem('token-data')
        }

        
    }

    return [auth, setAuth]
}