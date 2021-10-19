import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: '',
    login: () => {},
    logout: () => {},
})

export default AuthContext