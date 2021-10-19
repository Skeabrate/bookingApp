import { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "../../../axiosData";
import ThemeContext from "../../../context/themeContext";
import { objectToArrayWithId } from "../../../Helpers/objects";
import useAuth from "../../../hooks/useAuth.js/useAuth";
import './MyHotels.css'
import LoadingIcon from "../../../UI/LoadingIcon/LoadingIcon";
import { storage } from "../../../Firebase/config";

export default function MyHotels() {
    const { url } = useRouteMatch()
    const [hotels, setHotels] = useState()
    const [auth] = useAuth()
    const [loading, setLoading] = useState(false)

    const theme = useContext(ThemeContext)

    const fetchHotels = async () => { // eslint-disable-line react-hooks/exhaustive-deps
        try {
            const res = await axios.get('/hotels.json')
            const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId)
            setHotels(newHotel)
        } catch (ex) {
            console.log(ex.response)
        }
        setLoading(true)
    }

    const deleteHandler = async (id) => {
        try {
            const res = await axios.get(`/hotels/${id}.json?auth=${auth.token}`)
            const file = storage.refFromURL(res.data.image)
            file.delete() 
            await axios.delete(`/hotels/${id}.json?auth=${auth.token}`)
            setHotels(hotels.filter(x => x.id !== id))
            
        } catch (ex) {
            const errorMsg = ex.response.data.error
            
            if(errorMsg.includes('Auth token is expired')) {
                alert('Zaloguj się ponownie!')
            }
        } 

    }

    useEffect(() => {
        fetchHotels()  
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {loading ? (
                <>
                    {hotels.length > 0 ? (
                        <table className={`table myHotelsTheme-${theme.color}`}>
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Status</th>
                                    <th>Opcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map(hotel => (
                                    <tr key={hotel.id}>
                                        <td>{hotel.name}</td>
                                        <td>
                                            {parseInt(hotel.status) === 1
                                                ? <span className="badge bg-success text-light">Aktywny</span>
                                                : <span className="badge bg-secondary text-light">Ukryty</span>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="me-3 btn btn-warning">Edytuj</Link>
                                            <button onClick={() => deleteHandler(hotel.id)} className="btn btn-danger">Usuń</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p
                            style={{ fontSize: '1.3rem', padding: '50px' }}
                            className={`text-center myHotelsTheme-${theme.color}`}
                        >
                            Nie masz jeszcze żadnego hotelu!
                        </p>
                    )}
                    <Link to={`${url}/dodaj`} className={`btn btn-${theme.color} mb-3`}>Dodaj hotel</Link>
                </>
            ) : (
                <LoadingIcon />
            )}

        </div>
    )
}