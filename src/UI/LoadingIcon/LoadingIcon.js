import { useContext } from "react"
import ThemeContext from "../../context/themeContext"


export default function LoadingIcon(props) {
    const theme = useContext(ThemeContext)

    return (

                <div className="d-flex justify-content-center p-5">
                    <div className={`spinner-border text-${theme.color}`} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>  
    )
}