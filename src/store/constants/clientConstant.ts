export const SET_CLIENT_LOADED = 'SET_CLIENT_LOADED';
export type SET_CLIENT_LOADED = typeof SET_CLIENT_LOADED

export interface ICLIENTLOADED {
    type: SET_CLIENT_LOADED;
    isLoaded: boolean;
}
