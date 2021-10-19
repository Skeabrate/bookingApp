import { useContext } from "react"
import { Switch, Route, NavLink, useRouteMatch} from "react-router-dom"
import ThemeContext from "../../context/themeContext"
import NotFound from "../404/404"
import MyHotels from "./MyHotels/Myhotels"
import ProfileDetails from "./ProfileDetails/ProfileDetails"


export default function Profile(props) {
    const { path, url } = useRouteMatch()
    const theme = useContext(ThemeContext)

    return (
        <div className={`card PageTheme-${theme.color}`}>
            <div className="class-header">
                <h2 className="p-4" style={{ fontWeight: 'bold'}}>Mój profil</h2>
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs">

                    <li className="nav-item">
                        <NavLink className="nav-link" exact to={`${url}`}>Profil</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link " exact to={`${url}/hotele`} >Hotele</NavLink>
                    </li>
                    
                </ul>

                <div className="ps-3 pt-4">
                    <Switch>
                        <Route exact path={`${path}/hotele`} component={MyHotels}/>
                        <Route exact path={`${path}`} component={ProfileDetails}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>

            </div>
        </div>
    )
}