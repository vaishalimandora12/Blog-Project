import { _httpStatusService } from "./_httpStatus";


export const _infoMessaage = {
    required: (value?: string) => {
        return `${value || 'This'} field is required`;
    },
    unique: (value?: string) => {
        return `${value} already exists`;
    },
    minLength: (min: Number) => {
        return `${min} characters`;
    },
    Invalid: (value: string) => {
        return `${value} is invalid`;
    },
    emailNotRegex: (value: string) => {
        return `${value} is not exist`;
    },
    validEmail: () => {
        return `Invalid email address`;
    },
    keyrequired: (value: string) => {
        return `Please enter ${value}`;
    },
};
