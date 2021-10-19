import { useContext } from 'react'
import ThemeContext from '../../context/themeContext'
import './HotelNotFound.css'

const HotelNotFound = (props) => {
    const theme = useContext(ThemeContext)

    return (
        <h1 className={`notFound text-${theme.color}`}>"Nie znaleziono pasujących wyników"</h1>
    )
}

export default HotelNotFound