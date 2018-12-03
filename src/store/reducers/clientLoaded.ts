import { ICLIENTLOADED } from "../constants/clientConstant";

export const setClientLoadedReducer = (state: boolean = false, action: ICLIENTLOADED): boolean => {
    if(action.isLoaded){
        return action.isLoaded;
    }
    return state;
}