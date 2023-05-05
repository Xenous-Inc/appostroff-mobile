import { ISignUpRequestPayload, IVerificationRequestPayload } from 'src/api/types/auth.types';

export const AuthRests = {
    REQUEST_PHONE: (payload: ISignUpRequestPayload) => ({
        method: 'post',
        url: '/auth/requestCode',
        data: payload,
    }),
    CONFIRMATION_CODE: (payload: IVerificationRequestPayload) => ({
        method: 'post',
        url: '/auth/confirmationCode',
        data: payload,
    }),
};
