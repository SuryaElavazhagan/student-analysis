import { SET_FILTERS } from "../actions/filterActions";
import { SET_ARREAR_CATEGORY, SET_BOARD, SET_CACHED_ARRAY, SET_CASTE, SET_GENDER, SET_HSC_MARK_LIMIT, SET_SSLC_MARK_LIMIT } from "../constants/filterConstants";
import { IFilter } from '../types';

export const filtersReducer = (state: IFilter[] = [], action: SET_FILTERS): IFilter[] => {
    let tempFilter!: IFilter;
    switch(action.type) {
        case SET_ARREAR_CATEGORY:
            tempFilter = {
                ...state[action.key],
                arrearCategory: action.arrearCategory
            }
            break;
        case SET_BOARD:
            tempFilter = {
                ...state[action.key],
                board: action.board
            }
            break;
        case SET_GENDER:
            tempFilter = {
                ...state[action.key],
                gender: action.gender
            }
            break;
        case SET_CASTE:
            tempFilter = {
                ...state[action.key],
                caste: action.caste
            }
            break;
        case SET_HSC_MARK_LIMIT:
            tempFilter = {
                ...state[action.key],
                highSchoolFilter: action.markLimit
            }
            break;
        case SET_SSLC_MARK_LIMIT:
            tempFilter = {
                ...state[action.key],
                secondarySchoolFilter: action.markLimit
            }
            break;
        case SET_CACHED_ARRAY:
            tempFilter = {
                ...state[action.key],
                cachedArray: action.cachedArray
            }
        default:
            return state;
    }

    return [
        ...state.slice(0, action.key),
        tempFilter,
        ...state.slice(action.key + 1)
    ]
}

