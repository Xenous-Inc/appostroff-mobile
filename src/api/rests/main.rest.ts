import { ISignUpRequestPayload, IVerificationRequestPayload } from 'src/api/types/auth.types';

export const MainRests = {
    REQUEST_RANDOM_STORY: (payload: ISignUpRequestPayload) => ({
        method: 'get',
        url: '/stories',
        data: payload,
    }),
};
