import { useHistory } from "react-router"
import Input from "../../../../components/Input/Input"
import useAuth from '../../../../hooks/useAuth.js/useAuth'
import { useContext, useEffect, useRef, useState } from 'react'
import ThemeContext from '../../../../context/themeContext'
import axios from '../../../../axiosData'
import LoadingButton from "../../../../UI/LoadingButton/LoadingButton"
import { validate } from "../../../../Helpers/validations"
import { storage } from "../../../../Firebase/config"
import '../../../../ThemeCss/ThemeCss.css'

function AddHotel() {
    const [loading, setLoading] = useState(false)
    const [auth] = useAuth()
    const [valid, setValid] = useState('')
    const [form, setForm] = useState({
        name: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 4 }]
        },
        description: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 10 }]
        },
        city: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 4 }]
        },
        rooms: {
            value: 2,
            error: '',
            showError: false,
            rules: ['required']
        },
        features: {
            value: [],
            error: '',
            showError: false,
        },
        image: {
            value: '',
            error: '',
            showError: false,
            rules: ['required']
        },
        status: {
            value: '1',
            error: '',
            showError: false,
            rules: ['required']
        },

    })
    const [previewUrl, setPreviewUrl] = useState()

    const fileRef = useRef()
    const theme = useContext(ThemeContext)
    const history = useHistory()


    const pickedImageHandler = (e) => {
        e.preventDefault()
        fileRef.current.click()
    }

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const uploadTask = storage.ref(`images/${form.image.value.name}`).put(form.image.value)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress
                    progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(progress)
                },
                (err) => {
                    console.log(err)
                },
                () => {
                    storage.ref("images")
                        .child(form.image.value.name)
                        .getDownloadURL()
                        .then((imageUrl) => {
                            axios.post(`/hotels.json?auth=${auth.token}`, {
                                name: form.name.value,
                                description: form.description.value,
                                city: form.city.value,
                                rooms: form.rooms.value,
                                features: form.features.value,
                                image: imageUrl,
                                imageName: form.image.value.name,
                                status: form.status.value,
                                user_id: auth.userId,
                            })
                        })
                        .then(history.push(`/profil`))                     
                }
            )

        } catch (ex) {
            console.log(ex.response)
        } 

    }

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value)
        setForm({
            ...form,
            [fieldName]: { ...form[fieldName], value, showError: true, error: error }
        })
    }


    //// File Reader
    useEffect(() => {
        if (form.image.value === undefined || form.image.value === '') {
            setPreviewUrl(null)
            return null
        }
        else {
            const typesTable = [
                { name: 'image/jpg' },
                { name: 'image/jpeg' },
                { name: 'image/png' },
                { name: 'image/svg' },
                { name: 'image/webp' },
            ]
            if (typesTable.find(x => x.name === form.image.value.type)) {
                const fileReader = new FileReader()
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result)
                }
                fileReader.readAsDataURL(form.image.value)
            } else {
                alert("Nieodpowiedni format zjdęcia!")
                form.image.value = ''
                setPreviewUrl(null)
                console.log(form.image.value)
                return null
            }

        }
    }, [form.image.value])


    //// Validation 
    useEffect(() => {
        const emptyForm = Object.values(form).map(input => input.error).filter(x => x).length
        const emptyName = !form.name.value
        const emptyDescription = !form.description.value
        const emptyCity = !form.city.value
        const empptyFile = !form.image.value

        if (emptyForm || emptyName || emptyCity || emptyDescription || empptyFile) {
            setValid(true)
        }
        else {
            setValid(false)
        }
    }, [form])

    return (
        <div className={`card PageTheme-${theme.color}`}>
            <div className="card-header">Dodaj Hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane: </p>
                <form className="p-5" onSubmit={submit}>
                    <Input
                        label="Nazwa"
                        type="text"
                        value={form.name.value}
                        onChange={val => changeHandler(val, 'name')}
                        error={form.name.error}
                        showError={true}
                    />

                    <Input
                        label="Opis"
                        type="textarea"
                        value={form.description.value}
                        onChange={val => changeHandler(val, 'description')}
                        error={form.description.error}
                        showError={true}
                    />

                    <Input
                        label="Miejscowość"
                        type="text"
                        value={form.city.value}
                        onChange={val => changeHandler(val, 'city')}
                        error={form.city.error}
                        showError={true}
                    />

                    <Input
                        label="Ilość pokoi"
                        type="select"
                        value={form.rooms.value}
                        onChange={val => changeHandler(val, 'rooms')}
                        options={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                            { value: 5, label: 5 },
                        ]}
                        error={form.rooms.error}
                        showError={true}
                    />

                    <h4 className="pt-4">Udogodnienia</h4>
                    <Input
                        type="checkBox"
                        value={form.features.value}
                        onChange={val => changeHandler(val, 'features')}
                        options={[
                            { value: 'tv', label: 'TV' },
                            { value: 'wifi', label: 'Wi-Fi' },
                            { value: 'parking', label: 'Parking' },
                        ]}
                        error={form.features.error}
                        showError={true}
                    />

                    <h4 className="pt-4">Zdjęcie</h4>
                    <div className="form-group">
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            onChange={e => changeHandler(e.target.files[0], 'image')}
                            ref={fileRef}
                        />
                    </div>
                    {previewUrl ? <img alt="" className="img-fluid img-thumbnail row" src={previewUrl}></img> : null}
                    <button onClick={pickedImageHandler} className={`btn btn-${theme.color} mt-2 mb-2`}>Dodaj Zdjęcie!</button>

                    <h4 className="pt-4">Status</h4>
                    <Input
                        type="radio"
                        name="status"
                        value={form.status.value}
                        onChange={val => changeHandler(val, 'status')}
                        options={[
                            { value: '1', label: 'Aktywny' },
                            { value: '0', label: 'Ukryty' }
                        ]}
                        error={form.status.error}
                        showError={true}
                    />

                    <div className="text-center">
                        <LoadingButton
                            loading={loading}
                            className="btn btn-success"
                            label={"Dodaj Hotel!"}
                            disabled={valid}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddHotel