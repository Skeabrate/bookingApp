import React, { useContext } from "react";
import style from './Menu.module.css'
import ThemeContext from "../../context/themeContext";
import { NavLink } from 'react-router-dom'
import useAuth from "../../hooks/useAuth.js/useAuth";

function Menu() {
    const [auth, setAuth] = useAuth()
    const theme = useContext(ThemeContext)

    const logout = e => {
        e.preventDefault()
        setAuth(null)
    }

    const reladPage = () => {
        setTimeout(()=>{
            window.location.reload(false);
        }, 10);
        console.log('page to reload')
    }

    return (
        <div className={`${style.menuContainer} container card-body`}>
            <ul className={`${style.menu}`}>
                <li className={`${style.menuItem}`}>
                    <NavLink onClick={reladPage} activeClassName={style.menuItemActive} exact to="/" className={`text-${theme.color}`}>
                        Home
                    </NavLink>
                </li>
            
                {auth ? (
                    <>
                        <li className={`${style.menuItem} `}>
                            <a href="#" className={`text-${theme.color}`} onClick={logout}>Wyloguj</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid */}
                        </li>
                        <li className={`${style.menuItem} `}>
                            <NavLink activeClassName={style.menuItemActive} to="/profil" className={`text-${theme.color}`}>
                                Mój profil
                            </NavLink>
                        </li>
                    </>) : 
                    (<>
                        <li className={`${style.menuItem}`}>
                            <NavLink to="/zaloguj" className={`text-${theme.color}`} activeClassName={style.menuItemActive}>Zaloguj</NavLink>
                        </li>

                        <li className={`${style.menuItem}`}>
                            <NavLink to="/rejestracja" className={`text-${theme.color}`} activeClassName={style.menuItemActive}>Rejestracja</NavLink>
                        </li>
                    </>)
                }
                
            </ul>
        </div>
    )
}

export default Menu