import React from "react"

const ThemeContext = React.createContext({
    color: '',
    changeTheme: () => {}
})

export default ThemeContext 