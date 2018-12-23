export const SET_GENDER = 'SET_GENDER';
export type SET_GENDER = typeof SET_GENDER;

export interface IGENDERS {
    gender: string;
    key: number;
    type: SET_GENDER;
}

export const SET_BOARD = 'SET_BOARD';
export type SET_BOARD = typeof SET_BOARD;

export interface IBOARD {
    board: string;
    key: number;
    type: SET_BOARD;
}

export const SET_ARREAR_CATEGORY = 'SET_ARREAR_CATEGORY';
export type SET_ARREAR_CATEGORY = typeof SET_ARREAR_CATEGORY;

export interface IARREARCATEGORY {
    arrearCategory: string;
    key: number;
    type: SET_ARREAR_CATEGORY;
}

export const SET_CASTE = 'SET_CASTE';
export type SET_CASTE = typeof SET_CASTE;

export interface ICASTE {
    key: number;
    caste: string;
    type: SET_CASTE;
}

export const SET_SEMESTER = 'SET_SEMESTER';
export type SET_SEMESTER = typeof SET_SEMESTER;

export interface ISEMESTER {
    key: number;
    semester: number;
    type: SET_SEMESTER;
}

export const SET_HSC_MARK_LIMIT = 'SET_HSC_MARK_LIMIT';
export type SET_HSC_MARK_LIMIT = typeof SET_HSC_MARK_LIMIT;

export const SET_SSLC_MARK_LIMIT = 'SET_SSLC_MARK_LIMIT';
export type SET_SSLC_MARK_LIMIT = typeof SET_SSLC_MARK_LIMIT;

export interface IHSCMARKLIMIT {
    markLimit: string;
    key: number;
    type: SET_HSC_MARK_LIMIT;
}

export interface ISSLCMARKLIMIT {
    markLimit: string;
    key: number;
    type: SET_SSLC_MARK_LIMIT;
}

export const SET_CACHED_ARRAY = 'SET_CACHED_ARRAY';
export type SET_CACHED_ARRAY = typeof SET_CACHED_ARRAY;

export interface ICACHEDARRAY {
    cachedArray: any[];
    key: number;
    type: SET_CACHED_ARRAY;
}

export const SET_DATA_LOADED = 'SET_DATA_LOADED';
export type SET_DATA_LOADED = typeof SET_DATA_LOADED;

export interface IDATALOADED {
    type: SET_DATA_LOADED;
    key: number;
    isLoaded: boolean;
}