import './Footer.css'
import { useContext } from "react"
import ThemeContext from "../../context/themeContext"

export default function Footer(props) {

    const theme = useContext(ThemeContext)
    
    return ( 
        <div className={`text-${theme.color} footerStyle`}>
            Stopka 2021
        </div>
    )
}