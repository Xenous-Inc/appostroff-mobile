import { SerializedError } from '@reduxjs/toolkit';

export interface IApiState<T> {
    isLoading: boolean;
    data?: T;
    error?: SerializedError;
}
