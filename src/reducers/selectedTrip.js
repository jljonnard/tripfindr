/* eslint-disable import/no-anonymous-default-export */
export default (state = { index: -1 }, action) => {
    switch (action.type) {
        case "INCREMENT_SELECTED_TRIP":
            return state.index < action.payload.length - 1
                ? action.payload[state.index + 1]
                : state;
        case "DECREMENT_SELECTED_TRIP":
            return state.index > 0 ? action.payload[state.index - 1] : state;
        case "INIT_SELECTED_TRIP":
            return action.payload[0];
        default:
            return state;
    }
};
