import { useEffect, useState, useCallback, useRef } from "react"
import moment from 'moment'
import { Link } from "react-router-dom"

export default function BestHotel (props) {
    const [time, setTime] = useState('')
    const [ hotels ] = useState([...props.hotels])
    const endTime = moment().add(15, 'minutes').add(20, 'seconds')
    let interval = useRef(null)

    useEffect(() => {
        interval.current = setInterval(()=> {
            const leftTime = - moment().diff(endTime) / 1000
            const minutes = Math.floor(leftTime / 60)
            const seconds = Math.floor(leftTime % 60)
            setTime(`${minutes} minut, ${seconds} sekund`)  
            if(minutes && seconds <= 0){
                clearInterval(interval.current)
                setTime('Oferta Wygasła')
            }
        }, 1000)
        // componentWillUnmount
        return () => {
            clearInterval(interval.current)
        }
    },[])  
    
     
    const sortFunction = () => {
        hotels.map(hotel => hotel.rating === undefined ? hotel.rating = 0 : null)
        return hotels.sort((a, b) => {
            if (a.rating > b.rating) {
                return -1
            }
            else return 1
        })[0]
    }   

    const getBestHotel = useCallback(() => {
        if(hotels.length < 2){
          return null
        }
        else {
          return sortFunction()
        }  
    }, [props.hotels])
    
    return (
        <>
        {getBestHotel() ? (
            <div className="card bg-success text-white col-sm-6 mx-auto">
            <div className="card-header">Najlepsza Oferta!</div>

            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5>{hotels[0].name}</h5>
                    <p>Ocena: {hotels[0].rating}</p>
                </div>
                <p>Do końca ofery zostało: {time}</p>
                <Link to={`/hotele/${hotels[0].id}`} className="btn btn-sm btn-light">Pokaż</Link>
            </div>
        </div>
        ) : null}
        </>
        
    )
}