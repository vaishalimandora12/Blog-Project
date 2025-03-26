
export interface user {
    _id?: any;
    userType: string;
    firstName: string;
    lastName?: string;
    password?: string;
    email?: string;
    countryCode?: string;
    phoneNumber?: string;
    userId?: number;
    socialLogin?: boolean;
    status?: string;
    address?: {
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        location?: {
            type?: string;
            coordinates?: any[];
        };
    };
    phone_otp_verfied?: boolean;
    email_otp_verfied?: boolean;
    isActive?: boolean;
    isDeleted?: boolean;
    profileImage?: any;
    userProfileUpdate?: any;
    gender: string;
}
