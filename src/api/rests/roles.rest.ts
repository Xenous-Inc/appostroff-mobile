import { IGetRoleRequestQuery, ICreateRoleRequestPayload } from 'src/api/types/roles.types';

export const AuthRests = {
    GET_ROLE: (query: IGetRoleRequestQuery) => ({
        method: 'get',
        url: `/roles/${query.value}`,
        data: query,
    }),
    CREATE_ROLE: (payload: ICreateRoleRequestPayload) => ({
        method: 'post',
        url: '/roles',
        data: payload,
    }),
};
