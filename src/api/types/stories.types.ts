export interface IGetStoryRequestQuery {
    id: string;
}

export interface IGetStoryResponcePayload {
    id: string;
    title: string;
    rating: number;
    description: string;
}

export interface ICreateStoryRequestPayload {
    description: string;
    title: string;
}

export interface IGetRandomStoryResponcePayload {
    id: string;
    title: string;
    rating: number;
    description: string;
}
