const withClass = (WrappedComponenet) => {
    return props => (
        <WrappedComponenet {...props}/>
    )   
}

export default withClass