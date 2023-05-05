import {
    IBanUserRequestPayload,
    IGiveRoleRequestPayload,
    IUpdateUserRequestPayload,
    IUpdateUserResponcePayload,
    IDeleteUserRequestQuery,
    IGetUserRequestQuery,
} from '@api/types/user.types';

export const UserRests = {
    BAN_USER: (payload: IBanUserRequestPayload) => ({
        method: 'post',
        url: '/users/ban',
        data: payload,
    }),
    GIVE_ROLE: (payload: IGiveRoleRequestPayload) => ({
        method: 'post',
        url: '/users/role',
        data: payload,
    }),
    USERS: () => ({
        method: 'get',
        url: '/users',
    }),
    UPDATE_USER: (query: IUpdateUserResponcePayload, payload: IUpdateUserRequestPayload) => ({
        method: 'patch',
        url: `/users/${query.id}`,
        data: payload,
    }),
    DELETE_USER: (query: IDeleteUserRequestQuery) => ({
        method: 'delete',
        url: `/users/${query.id}`,
        data: query,
    }),
    GET_USER: (query: IGetUserRequestQuery) => ({
        method: 'get',
        url: `/users/${query.id}`,
        data: query,
    }),
};
