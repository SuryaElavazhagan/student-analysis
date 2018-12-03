import { combineReducers } from 'redux';
import { setClientLoadedReducer } from "./clientLoaded";
import { filtersReducer } from "./filterReducers";

const rootReducer = combineReducers({
    filters: filtersReducer,
    isClientLoaded: setClientLoadedReducer
});

export{
    rootReducer
};