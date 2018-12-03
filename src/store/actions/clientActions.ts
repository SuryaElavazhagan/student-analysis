import * as constants from "../constants/clientConstant";

export const setClientLoaded = (isLoaded: boolean): constants.ICLIENTLOADED => ({
    isLoaded,
    type: constants.SET_CLIENT_LOADED
})
