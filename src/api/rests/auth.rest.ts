import { ISignUpRequestPayload } from 'src/api/types/auth.types';

export const AuthRests = {
    SIGN_UP: (payload: ISignUpRequestPayload) => ({
        method: 'post',
        url: '/auth/signUp',
        data: payload,
    }),
};
