import './Hotel.css'
import React, { useContext } from "react";
import style from './Hotel.module.css'
import PropTypes from 'prop-types'
import ThemeContext from "../../../context/themeContext";
import { Link } from "react-router-dom";
import useAuth from '../../../hooks/useAuth.js/useAuth';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

function Hotel(props) {
    const theme = useContext(ThemeContext)
    const [auth] = useAuth() 

    return (
        <div className={`card hotelTheme-${theme.color}`}>
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <img
                            src={props.image}
                            alt=""
                            className="img-fluid img-thumbnail"
                        />
                    </div>

                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <p className={`titleRatingTheme-${theme.color} ${style.title}`}>{props.name}</p>
                                <span className={`badge alert-${theme.color}`}>{props.city}</span>
                            </div>

                            <div className="col text-end">
                                <h5
                                    className={`titleRatingTheme-${theme.color}`}
                                >
                                    Ocena: <span style={{ fontWeight: 'bold' }}>{props.rating ?? '0'}</span></h5>
                                <Link to={`/hotele/${props.id}`} className={`btn btn-${theme.color} mt-2 px-5 float-end`}>Pokaż</Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-12">
                        <p className={`${style.description}`}>
                            {props.description}
                        </p>

                        {auth
                            ? <p className={`mt-2 titleRatingTheme-${theme.color}`}>Dostępność: {props.rooms} pokoje</p>
                            : <p className={`mt-2 titleRatingTheme-${theme.color}`}>Dostępność: zaloguj</p>}

                    </div>

                </div>
            </div>
        </div>
    )
}

Hotel.propTypes = propTypes

export default Hotel