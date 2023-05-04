import { ISignUpRequestPayload } from 'src/api/types/auth.types';

export const AuthRests = {
    REQUEST_PHONE: (payload: ISignUpRequestPayload) => ({
        method: 'post',
        url: '/auth/requestCode',
        data: payload,
    }),
};
