import React, { useContext } from 'react'
import ThemeContext from '../../context/themeContext'
import Hotel from './Hotel/Hotel'
import style from './Hotels.module.css'

function Hotels(props) {
    const theme = useContext(ThemeContext)

    return (
        <div className={style.container}>
            <h2 className={`${style.title} text-${theme.color}`}>Oferty: {`(${props.hotels.length})`}</h2>
            {props.hotels.map(hotels => <Hotel key={hotels.id} {...hotels} theme={props.theme}/>)}
        </div>
    )
}

export default Hotels