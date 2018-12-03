import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { IFilter, IStoreState } from './types';

const filter: IFilter = {
    arrearCategory: '',
    board: '',
    cachedArray: [],
    caste: [],
    gender: '',
    highSchoolFilter: '',
    secondarySchoolFilter: '',
    semester: ''
};

const persistedState: IStoreState = {
    filters: Array.from(new Array(5), () => Object.assign({}, filter)),
    isClientLoaded: false
}

export const store = createStore(rootReducer, persistedState);
