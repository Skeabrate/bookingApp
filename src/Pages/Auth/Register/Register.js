import { useState, useContext } from 'react'
import LoadingButton from '../../../UI/LoadingButton/LoadingButton'
import { validate } from '../../../Helpers/validations'
import Input from '../../../components/Input/Input'
import useAuth from '../../../hooks/useAuth.js/useAuth'
import { useHistory } from 'react-router-dom'
import axios from '../../../axios'
import ThemeContext from "../../../context/themeContext"

export default function Register(props) {
    const [auth, setAuth] = useAuth()
    const [form, setForm] = useState({
        email: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', 'email']
        },
        password: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 6}]
        },
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const theme = useContext(ThemeContext)
    const history = useHistory()

    const submit = async e => {
        e.preventDefault()
        setLoading(true)

        /* const res = await axios.post('https://booking-app-18890-default-rtdb.firebaseio.com/users.json', 
                                    { email: form.email.value, password: form.password.value})
        console.log(res) */
        try{
            const res = await axios.post('accounts:signUp', {
                email: form.email.value,
                password: form.password.value,
                returnSecureToken: true
            })
            
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            })
            history.push('/')

        } catch (ex) {
            const errorMsg = ex.response.data.error.message
            
            if(errorMsg.includes('WEAK_PASSWORD')) setError('Za Słabe Hasło!')
            if(errorMsg.includes('EMAIL_EXISTS')) setError('Taki Email Istnieje!')
            
            console.log(ex.response)
        }
        setLoading(false)


    }

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value)
        setForm({...form, [fieldName]: {...form[fieldName], value, showError: true, error: error}})
    }

    const validInput = () => {
        const valid = Object.values(form).map(input => input.error).filter(x => x).length
        const emptyEmail = !form.email.value
        const emptyPassword = !form.password.value
        let checkInput = ''

        if(valid || emptyEmail || emptyPassword) checkInput = true
        else checkInput = false

        return checkInput
    }
    
    if(auth) {
        history.push('/')
    }
    
    return(
        <div className={`card PageTheme-${theme.color}`}>
        <div className="card-header">
            <h1 className="pt-4 ps-3">Rejestracja</h1>
        </div>
        <div className="card-body">

            <p className="text-muted">Uzupełnij dane: </p>

            <form className="p-2" onSubmit={submit}>

                <Input
                    label="Email"
                    type="email"
                    value={form.email.value}
                    onChange={val => changeHandler(val, 'email')}
                    error={form.email.error}
                    showError={true}
                />

                <Input
                    label="Hasło"
                    type="password"
                    value={form.password.value}
                    onChange={val => changeHandler(val, 'password')}
                    error={form.password.error}
                    showError={true}
                />

                {error ? (
                <div className="alert alert-danger mt-3"> {error} </div> ) : null}

                <div className="pt-4">
                    <LoadingButton
                        loading={loading}
                        className="btn btn-success"
                        label="Zarejestruj!"
                        disabled={validInput()}
                    />
                </div>



            </form>

        </div>
    </div>
    )
}