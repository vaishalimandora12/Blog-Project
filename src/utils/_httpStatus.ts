interface  _httpStatusInterface{
    readonly success: any 
    readonly serverError: any
    readonly created: any
    readonly updated: any
    readonly Unauthorized: any
    readonly Forbidden: any
    readonly NotFound: any
    readonly Proxy :any
    readonly UnprocessableEntity:any
    readonly badRequest: any
    readonly OK:any,
}
class httpStatus {
    public status:_httpStatusInterface = {
        success: 200,
        serverError: 500,
        created: 201,
        updated: 201,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        Proxy: 407,
        UnprocessableEntity: 422,
        badRequest: 400,
        OK:200,
    }
};

export const _httpStatusService = new httpStatus()