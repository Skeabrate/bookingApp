export default function validateEmail(text) {
    var re = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z]{2,4})$/i;
    return re.test(text)
}


const availableRules = {
    required(value){
        return value ? '' : 'Pole wymagane'
    },
    min(value, rule){
        return value.length >= rule.length ? '' : `Min. znaków: ${rule.length}`
    },
    email(value){
        return validateEmail(value) ? '' : 'Niepoprawny Email'
    },
}

export function validate (rules = [], value) {
    for(let i=0; i<rules.length; i++) {
        const rule = rules[i]
        if(rule instanceof Object){
            const errorMessage = availableRules[rule.rule](value, rule)
            if(errorMessage) {
                return errorMessage
            }   
        } else {
            const errorMessage = availableRules[rule](value)
            if(errorMessage) {
                return errorMessage
            }
        }
    }

    return ''
}