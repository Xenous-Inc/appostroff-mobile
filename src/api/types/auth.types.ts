export interface ISignUpRequestPayload {
    phone: string;
}

export interface IVerificationRequestPayload {
    code: number;
    callId: string;
}

export interface IVerificationResponsePayload {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshResponsePayload {
    accessToken: string;
    refreshToken: string;
}
