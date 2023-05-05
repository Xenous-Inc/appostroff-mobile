export interface IBanUserRequestPayload {
    userId: string;
    banReason: string;
}

export interface IGiveRoleRequestPayload {
    value: string;
    userId: string;
}

export interface IUsersResponcePayload {
    id: string;
    phone: string;
    name: string;
    hashedRt: string;
    isBanned: boolean;
    banReason: string;
}

export interface IUpdateUserRequestQuery {
    id: string;
}

export interface IUpdateUserRequestPayload {
    phone: string;
}

export interface IUpdateUserResponcePayload {
    id: string;
    phone: string;
    name: string;
    hashedRt: string;
    isBanned: boolean;
    banReason: string;
}

export interface IDeleteUserRequestQuery {
    id: string;
}

export interface IGetUserRequestQuery {
    id: string;
}

export interface IGetUserResponcePayload {
    id: string;
    phone: string;
    name: string;
    hashedRt: string;
    isBanned: boolean;
    banReason: string;
}
