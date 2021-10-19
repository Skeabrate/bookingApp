import React from 'react'
import styles from './Header.module.css'
import withMousePosition from '../../HOC/withMousePosition'

function Header(props) {
    const paralaxStyles = {
        transform: `translate(
                        ${props.mouseX / -100}px, 
                        ${props.mouseY / 250}px
                    )`
    }

    return (
        <header className={`${styles.header}`}>
            <div className={styles.headerImage} style={paralaxStyles}></div>
            {props.children}
        </header>
    )
}

export default withMousePosition(Header)