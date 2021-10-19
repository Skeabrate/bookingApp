import { useContext, useState } from "react"
import { useHistory } from "react-router"
import useAuth from "../../../hooks/useAuth.js/useAuth"
import LoadingButton from "../../../UI/LoadingButton/LoadingButton"
import axios from "../../../axios"
import ThemeContext from "../../../context/themeContext"
import '../../../ThemeCss/ThemeCss.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState('')
    const [auth, setAuth] = useAuth()

    const history = useHistory()
    const theme = useContext(ThemeContext)
    

    const submit = async e => {
        e.preventDefault()
        setLoading(true)

        try{
            const res = await axios.post('accounts:signInWithPassword' ,{
                email,
                password,
                returnSecureToken: true,
            })

            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            })

        } catch(ex) {
            const errorMsg = ex.response.data.error.message
            
            if(errorMsg.includes('EMAIL_NOT_FOUND')) {
                setError('Niepoprawny Email!')
                setPassword('')
            }
            if(errorMsg.includes('INVALID_PASSWORD')){
                setError('Niepoprawne Hasło!')
                setPassword('')
            }
            if(errorMsg.includes('CONFIGURATION_NOT_FOUND')){
                setError('Błędne Dane!')
                setPassword('')
            }
            setLoading(false)
            
        }
    }

    if(auth){
        history.push('/')
    }

    return (
        <div className={`card PageTheme-${theme.color}`}>
            <div className="card-header">
                <h1 className="pt-4 ps-3">Logowanie</h1>
            </div>
            


            <form className="p-3" onSubmit={submit}>
                <div className="form-group">
                    <label className="p-2">Email</label>
                    <input 
                        type="email" 
                        className="form-control w-50" 
                        placeholder="janKowalski@gmail.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        />
                </div>

                <div className="form-group">
                    <label className="p-2">Hasło</label>
                    <input 
                        type="password" 
                        className="form-control w-50"
                        placeholder="**********" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        />
                </div>

                {error ? (
                    <div className="alert alert-danger mt-3">{error}</div>
                ) : null}

                <LoadingButton loading={loading} className="btn btn-primary mt-3" label="Zaloguj"/>
                    
            </form>
        </div>
    )
}