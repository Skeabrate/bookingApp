import { useContext } from "react"
import ThemeContext from "../../context/themeContext"

export default function NotFound(){
    const theme = useContext(ThemeContext)

    return (
        <div className={`text-center text-${theme.color}`}>
           <h1 style={{ fontSize: '10vw'}}>404</h1> 
           <p>Nie znaleziono takiej strony!</p>
        </div>
    )
}