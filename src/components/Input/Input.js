const TextInput = (props) => (
    <div className="form-group">
        <label className="p-2">{props.label}</label>
        <input
            type={props.type}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`form-control w-50 ${props.error && props.showError ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">
            {props.error}
        </div>
    </div>
)

const TextareaInput = (props) => (
    <div className="form-group">
        <label className="p-2">{props.label}</label>
        <textarea
            type={props.type}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`form-control w-50 ${props.error && props.showError ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">
            {props.error}
        </div>

    </div>
)

const SelectInput = (props) => (
    <div className="form-group w-25">
        <label className="p-2">{props.label}</label>
        <select
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className="form-control"
        >
            {props.options.map(option => 
                <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
        <div className="invalid-feedback">
            {props.error}
        </div>
    </div>
) 

const CheckBoxInput = (props) => {

    const changeFeatureHandler = (e) => {
        const value = e.target.value
        const isChecked = e.target.checked

        if (isChecked) {
            const newValue = [...props.value, value]
            props.onChange(newValue)
        }
        else {
            const newValue = props.value.filter(x => x !== value)
            props.onChange(newValue)
        }
    }

    return (
        <div className="form-group">
            {props.options.map(option =>
                <div className="custom-control custom-checkbox" key={option.value}>
                    <input
                        type={props.type}
                        className="custom-control-input"
                        value={option.value}
                        onChange={changeFeatureHandler}
                        checked={props.value.find(x => x === option.value)}
                        id={option.value}
                    />
                    <label className="custom-control-label ps-2" htmlFor={option.value}>{option.label}</label>
                </div>
            )}
        </div>
    )
}

const StatusInput = (props) => (
    <div className="form-group">
        {props.options.map(option =>
            <div className="custom-control custom-radio" key={option.value}>
                <input
                    type={props.type}
                    value={option.value}
                    onChange={e => props.onChange(e.target.value)}
                    checked={props.value === option.value}
                    id={`radio-${option.value}`}
                    name={props.name}
                    className="custom-control-input"
                />
                <label className="custom-control-label ps-2" htmlFor={`radio-${option.value}`}>{option.label}</label>
            </div>
        )}
    </div>
)




function Input (props) {

    switch (props.type) {
        case 'text' : 
            return <TextInput {...props}/>

        case 'textarea' :
            return <TextareaInput {...props}/>

        case 'select' :
            return <SelectInput {...props} />

        case 'checkBox' :
            return <CheckBoxInput {...props} />

        case 'radio' : 
            return <StatusInput {...props} /> 

        case 'password' : 
            return <TextInput {...props} type="password"/>

        case 'email' : 
            return <TextInput {...props} type="email"/>

        default: return <h1>Coś poszło nie tak</h1>
    }

}

Input.defaultProps = {
    type: 'text',
    error: false,
    showError: false,
}

export default Input