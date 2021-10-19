import React, { useState, useContext, useEffect, useRef } from "react";
import ThemeContext from "../../context/themeContext";
import { useHistory } from 'react-router-dom'

function Searchbar(props) {
    const [term, setTerm] = useState('')
    const theme = useContext(ThemeContext)
    const inputRef = useRef(null)
    const history = useHistory()

    const search = () => {
        if(term === ''){
            history.push('/')
        }
        else {
            history.push(`/wyszukaj/${term}`)
        }
    
    }

    const updateTerm = (e) => {
        setTerm(e.target.value)
    }

    useEffect(() => {
        inputRef.current.focus()
    },[])

    

    return (
        <div className="d-flex" style={{
            zIndex: 2,
            backgroundColor: 'transparent'
        }}>
            <input
                ref={inputRef}
                value={term}
                onChange={updateTerm}
                onKeyDown={e => e.keyCode === 13 && search()}
                className="form-control"
                type="text"
                placeholder="Szukaj..."
            />

            <button
                className={`btn btn-${theme.color} ms-1`}
                onClick={search}
            >
                Szukaj
            </button>
        </div>
    )
}

export default Searchbar