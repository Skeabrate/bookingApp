import React from "react"

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error){
        return { hasError: true 
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log('error, errorBoundary')
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        if (this.state.hasError){
            return <h1 style={{textAlign: 'center', marginTop: '200px'}}>Wystapil jakis problem</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundary