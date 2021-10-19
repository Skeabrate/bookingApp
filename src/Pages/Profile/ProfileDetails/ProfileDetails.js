import { useState, useEffect, useContext } from "react"
import LoadingButton from "../../../UI/LoadingButton/LoadingButton"
import validateEmail from "../../../Helpers/validations"
import useAuth from "../../../hooks/useAuth.js/useAuth"
import axios from "../../../axios"
import ThemeContext from "../../../context/themeContext"
import './ProfileDetails.css'

export default function ProfileDetails() {
    const [auth, setAuth] = useAuth()
    const [email, setEmail] = useState(auth.email)
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })
    const [success, setSuccess] = useState(false)

    const theme = useContext(ThemeContext)

    useEffect(() => {
        if(validateEmail(email)){
            setErrors({...errors, email:''})
        } else {
            setErrors({...errors, email: 'Niepoprawny email'})
        }
    }, [email]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(password.length >= 6){
            setErrors({...errors, password:''})
        } else {
            setErrors({...errors, password: 'Wymagane 6 znaków'})
        }
    }, [password]) // eslint-disable-line react-hooks/exhaustive-deps


    const submit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = {
                idToken: auth.token,
                email,
                returnSecureToken: true,
            }
            
            if(password){
                data.password = password
            }

            const res = await axios.post('accounts:update', data) 
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            })
            console.log(res)
            setSuccess(true)

        } catch(ex) {
            console.log(ex.response)
        }

        setLoading(false)
    }

    return (
        <div className={`card `}>
            
            {success ? (
                <div className="alert alert-success w-50 text-center mt-1 mb-0">Zmiany Zapisane!</div>) : null }

            <form className={`p-3 profileDetailsTheme-${theme.color}`} onSubmit={submit}>

                <h3 className="p-3">Zmiana Email i Hasła</h3>

                <div className="form-group">
                    <label className="p-2">Email</label>
                    <input 
                        type="email" 
                        className={`form-control w-50 ${errors.email ? 'is-invalid' : 'is-valid'} `} 
                        placeholder={email} 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <div className="invalid-feedback">{errors.email}</div>

                </div>

                

                <div className="form-group">

                    <label className="p-2">Hasło</label>
                    <input 
                        type="password" 
                        className={`form-control w-50 ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="**********"  
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <div className="invalid-feedback">{errors.password}</div>

                </div>
                <LoadingButton loading={loading}  className={`btn btn-${theme.color} mt-3`} label="Zapisz"/>
                    
            </form>
        </div>
    )
}