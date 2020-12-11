/* eslint-disable import/no-anonymous-default-export */
export default (state = false, action) => {
    switch (action.type) {
        case "OPEN_DETAILS":
            return true;
        case "CLOSE_DETAILS":
            return false;
        case "SWITCH_DETAILS":
            return !state;
        default:
            return state;
    }
};
