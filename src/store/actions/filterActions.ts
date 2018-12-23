import * as constants from "../constants/filterConstants";

export const setGenderFilter = (key: number, gender : string): constants.IGENDERS => ({
    gender,
    key,
    type: constants.SET_GENDER
})

export const setBoardFilter = (key: number, board : string): constants.IBOARD => ({
    board,
    key,
    type: constants.SET_BOARD
})

export const setArrearFilter = (key: number, arrearCategory : string): constants.IARREARCATEGORY => ({
    arrearCategory,
    key,
    type: constants.SET_ARREAR_CATEGORY
})

export const setCasteFilter = (key: number, caste : string): constants.ICASTE => ({
    caste,
    key,
    type: constants.SET_CASTE
})

export const setSemesterFilter = (key: number, semester : number): constants.ISEMESTER => ({
    key,
    semester,
    type: constants.SET_SEMESTER
})

export const setHighSchoolMarkLimit = (key: number, markLimit : string): constants.IHSCMARKLIMIT => ({
    key,
    markLimit,
    type: constants.SET_HSC_MARK_LIMIT
})

export const setSecondarySchoolMarkLimit = (key: number, markLimit : string): constants.ISSLCMARKLIMIT => ({
    key,
    markLimit,
    type: constants.SET_SSLC_MARK_LIMIT
})

export const setCachedArray = (key: number, cachedArray : any[]): constants.ICACHEDARRAY => ({
    cachedArray,
    key,
    type: constants.SET_CACHED_ARRAY
})

export const setDataLoaded = (key: number, isLoaded: boolean): constants.IDATALOADED => ({
    isLoaded,
    key,
    type: constants.SET_DATA_LOADED
})

export type SET_FILTERS = (constants.IGENDERS |
                        constants.IARREARCATEGORY |
                        constants.IBOARD |
                        constants.ICASTE |
                        constants.ISEMESTER |
                        constants.IHSCMARKLIMIT |
                        constants.ISSLCMARKLIMIT |
                        constants.IDATALOADED |
                        constants.ICACHEDARRAY);