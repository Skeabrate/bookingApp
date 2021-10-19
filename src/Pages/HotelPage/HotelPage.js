import { useContext, useEffect,  useState } from 'react'
import {useParams} from 'react-router-dom'
import ThemeContext from '../../context/themeContext'
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon'
import axios from '../../axiosData'
import useAuth from '../../hooks/useAuth.js/useAuth'
import LoadingButton from '../../UI/LoadingButton/LoadingButton'
import { useHistory } from 'react-router-dom'


function HotelPage(props) {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [hotel, setHotel] = useState([])
    const [auth] = useAuth()
    const [rating, setRating] = useState(5)
    const history = useHistory()

    const theme = useContext(ThemeContext)
    let x = 0

    const fetchHotel = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`)          
            setHotel(res.data)

        } catch (ex) {
            console.log(ex.response)
        }
        setLoading(false)
    }

    const rateHotel = async () => {
        try {
            await axios.put(`/hotels/${id}/rating.json?auth=${auth.token}`, rating)          
            history.push('/')   
        } catch (ex) {
            console.log(ex.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel()
        document.title = `Hotel - ${hotel.name}`
        window.scrollTo(0, 0)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const paragraphStyle = {
        borderBottom: '2px solid black', 
        padding: '30px',
        fontSize: '1.1rem'
    }

    const listStyle = {
        listStyle: 'none',
        fontSize: '1.1rem',
        padding: '10px'
    }

    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '40px',
        gap: '20px'
    }

    return (
        <div className={`card PageTheme-${theme.color}`}>
            {loading ? (
                <LoadingIcon/> 
            ) : (
                <div>
                    <h1 className="card-header text-center p-4"><span style={{ fontWeight: 'bold' }}>{hotel.name}</span></h1>
                    <div className="card-body text-center mt-4">
                        <img 
                            src={hotel.image}
                            alt="#"
                            className="img-fluid img-thumbnail mb-4 "
                        />
                    </div>

                    <div className="card-body ps-5" >    
                        <p style={paragraphStyle}>Miasto: <span className={`badge alert-${theme.color}`} style={{ fontWeight: 'bold' }}>{hotel.city}</span></p>
                        <p style={paragraphStyle}>{hotel.description}</p>
                        <p style={paragraphStyle}>Ilość dostępnych pokoi: <span style={{ fontWeight: 'bold' }}>{hotel.rooms}</span></p>

                        <h3 style={{ fontWeight: 'bold', padding: '30px',}}>Udogodnienia: </h3>
                        {hotel.features ? (
                            <ul>{hotel.features.map(item => {
                                x++
                                return (
                                    <li style={listStyle} key={item}><span style={{ fontWeight: 'bold' }}>{x}</span>. {item}</li>
                                )
                            }
                            )}</ul>

                        ) : null}

                        <h4 style={{ fontWeight: 'bold', padding: '30px', borderTop: '2px solid black', }}>Ocena: {hotel.rating ?? 'brak ocen'}</h4>
                    </div>

                    <div className="card-footer">
                        {auth ? (
                            <div>
                                <div style={footerStyle} >
                                    <div>
                                        <select 
                                            className="form-control form-select" 
                                            style={{ paddingLeft: '50px', paddingRight: '50px', fontSize: '1.1rem'}}
                                            value={rating}
                                            onChange={e => setRating(e.target.value)}
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                    <div>
                                        <button onClick={rateHotel} className={`btn btn-${theme.color}`} style={{ fontSize: '1.1rem'}}>Oceń</button>
                                    </div>
                                </div>

                                <div style={{ padding: '0px 30px 40px 30px' }}>
                                    <textarea className="form-control"/>
                                    <LoadingButton 
                                        label="Dodaj Komentarz!" 
                                        className={`btn btn-${theme.color}`} 
                                        style={{ marginTop: '20px', fontSize: '1.1rem'}}
                                    />
                                </div>

                            </div>
                        ) : null }
                    </div>

                    
                </div>
            )} 
        </div>
    )
}

export default HotelPage