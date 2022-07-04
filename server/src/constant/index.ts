// ------------------------------------ ENUM -------------------------------------------------------
export enum Role {
    ADMIN = "admin",
    USER = "user",
}


export enum CommonStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
}

export enum CouponStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    STOPPED = "stopped",
    DELETED = "deleted",
}

export enum CouponType {
    SHIPPING = "shipping",
    ORDER_VALUE = "order_value"
}


// ------------------------------------ CONSTANT -------------------------------------------------------

export const COMMON_ERROR_MESSENGER = "Something Wrong"

export const ERROR_MESSENGER_LOST_ITEM = "Item Not Found"

export const ERROR_MESSENGER_PHONE_NUMBER_EXISTS = 'Phone Number Exists'
export const ERROR_MESSENGER_CODE_COUPON_EXISTS = 'Code Coupon Exists'
export const ERROR_MESSENGER_NAME_COUPON_EXISTS = 'Name Coupon Exists'

export const ERROR_MESSENGER_INVALID_PHONE_NUMBER = 'Invalid Phone Number'
export const ERROR_MESSENGER_INVALID_PASSWORD = 'Invalid Password'

export const ERROR_MESSENGER_PASSWORD_SAME = 'Password Same'

export const ERROR_MESSENGER_USER_NOT_FOUND = 'User Not Found'
