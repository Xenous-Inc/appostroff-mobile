import { IGetStoryRequestQuery, ICreateStoryRequestPayload } from 'src/api/types/stories.types';

export const AuthRests = {
    GET_STORY: (query: IGetStoryRequestQuery) => ({
        method: 'get',
        url: `/stories/${query.id}`,
        data: query,
    }),
    CREATE_STORY: (payload: ICreateStoryRequestPayload) => ({
        method: 'post',
        url: '/stories',
        data: payload,
    }),
    GET_RANDOM_STORY: () => ({
        method: 'get',
        url: '/stories',
    }),
};
