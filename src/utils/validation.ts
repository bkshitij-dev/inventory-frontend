import { constants } from '../constants';

export const validateUsername = (value: string) => {
    if (value.trim() === '') {
        return 'Username is required.';
    } else if (value.length < constants.MIN_USERNAME_LENGTH) {
        return `Username must be at least ${constants.MIN_USERNAME_LENGTH} characters long.`;
    }
    return null;
}

export const validateEmail = (value: string) => {
    if (value.trim() === '') {
        return 'Email address is required.';
    } else if (!constants.EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address.';
    }
    return null;
}

export const validatePasword = (value: string) => {
    if (value.trim() === '') {
        return 'Password is required.';
    } else if (value.length < constants.MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${constants.MIN_PASSWORD_LENGTH} characters long.`;
    } else if (!constants.HAS_UPPERCASE_REGEX.test(value)) {
        return 'Password must contain at least one uppercase letter.';
    } else if (!constants.HAS_LOWERCASE_REGEX.test(value)) {
        return 'Password must contain at least one lowercase letter.';
    } else if (!constants.HAS_NUMBER_REGEX.test(value)) {
        return 'Password must contain at least one number.';
    } else if (!constants.HAS_SPECIAL_CHAR_REGEX.test(value)) {
        return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>).';
    }
    return null;
}

export const validateConfirmPassword = (value: string, allValues: any) => {
    if (value.trim() === '') {
        return 'Confirm password is required.';
    } else if (value !== allValues.password) {
        return 'Passwords do not match.';
    }
    return null;
}