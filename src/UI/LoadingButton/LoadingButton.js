import LoadingIcon from "../LoadingIcon/LoadingIcon"

export default function LoadingButton(props) {
    const newProps = {...props}
    delete newProps.loading

    return (
        props.loading ? (
            <LoadingIcon />
        ) : (
            <button {...newProps}>{props.label}</button>
        )
    )
}