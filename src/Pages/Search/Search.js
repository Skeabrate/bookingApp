import { useParams } from "react-router"
import axios from "../../axiosData"
import { objectToArrayWithId } from "../../Helpers/objects"
import { useContext, useEffect, useState } from "react"
import Hotels from "../../components/Hotels/Hotels"
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon"
import BestHotel from "../../components/Hotels/BestHotel/BestHotel"
import ThemeContext from "../../context/themeContext"

export default function Search(props) {
    const { term } = useParams()
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)

    const theme = useContext(ThemeContext)

    
    const search = async () => {
        try {
            const res = await axios.get('/hotels.json')
            const termToLowerCase = term.toLowerCase()
            const newHotel = objectToArrayWithId(res.data)
                                .filter(x => x.status !== 0).filter(hotel => hotel.name.toLowerCase().includes(termToLowerCase))
            
            setHotels(newHotel)

        } catch (ex) {
            console.log(ex.response)
        }
        setLoading(false)
    }

    useEffect(() => {
        search()
    }, [term]) // eslint-disable-line react-hooks/exhaustive-deps

    

    return (
        <div>
            {loading ? (
                <LoadingIcon />
            ) : ( 
                <>
                    {hotels.length > 1 ? <BestHotel hotels={hotels} /> : null}
                    <h2 
                        style={{ padding: '20px', borderRadius: '5px', marginTop: '10px'}} 
                        className={`PageTheme-${theme.color}`}
                    >
                        Wyniki wyszukiwania dla: <span style={{fontWeight: 'bold', marginLeft: '10px'}}>{term}</span>
                    </h2>
                    <Hotels hotels={hotels}/>
                </>
            )}
            
        </div>
    )
}