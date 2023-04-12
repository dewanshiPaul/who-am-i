const isEmail = (email) => {
    if(!email) {
        return 'Please enter email';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return 'Please enter valid email'
    } else 
        return '';
}

const isEmpty = (text, field) => {
    if(!text) {
        return `Please enter ${field}`
    } else 
        return '';
}

const isPhone = (phone) => {
    if(!phone) {
        return 'Please enter mobile number';
    } else if(!/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/i.test(phone)) {
        return 'Please enter valid mobile number'
    } else {
        return '';
    }
}

export {
    isEmail,
    isEmpty,
    isPhone
};
// ^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$