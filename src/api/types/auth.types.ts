export interface ISignUpRequestPayload {
    phoneNumber: string;
}

export interface ISignUpResponsePayload {
    accessToken: string;
    refreshToken: string;
}
