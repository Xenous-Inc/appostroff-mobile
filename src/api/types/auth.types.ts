export interface ISignUpRequestPayload {
    phone: string;
}

export interface ISignUpResponsePayload {
    accessToken: string;
    refreshToken: string;
}
