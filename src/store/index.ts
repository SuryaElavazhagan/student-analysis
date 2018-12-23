import { createStore } from "redux";
import { rootReducer } from "./reducers";
import { IFilter, IStoreState } from './types';

const filter: IFilter = {
    arrearCategory: '',
    board: '',
    cachedArray: [],
    caste: '',
    gender: '',
    highSchoolFilter: '',
    isLoaded: false,
    secondarySchoolFilter: '',
    semester: 1,
};

const persistedState: IStoreState = {
    filters: Array.from(new Array(5), () => Object.assign({}, filter)),
    isClientLoaded: false
}

export const store = createStore(rootReducer, persistedState);
