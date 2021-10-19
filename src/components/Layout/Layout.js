import { useContext } from "react"
import ThemeContext from "../../context/themeContext"
import '../Layout/Layout.css'

function Layout(props){
    const theme = useContext(ThemeContext)

    return (
        <div className={`bodyTheme-${theme.color}`}>
            <div>{props.header}</div>
            <div className="container containerHeight" >
                <div>{props.menu}</div>
                <div>{props.content}</div>
                <div>{props.footer}</div>
            </div>
        </div>
    )
}

export default Layout