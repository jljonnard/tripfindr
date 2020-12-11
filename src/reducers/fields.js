/* eslint-disable import/no-anonymous-default-export */
export default (
    state = { destination: "anywhere", season: "anytime", range: [0], direct: false },
    action
) => {
    switch (action.type) {
        case "SET_ORIGIN":
            return { ...state, origin: action.payload };
        case "SET_DESTINATION":
            return { ...state, destination: action.payload };
        case "SET_SEASON":
            return { ...state, season: action.payload };
        case "SET_RANGE":
            return { ...state, range: action.payload };
        case "SET_MINPRICE":
            return { ...state, minPrice: action.payload };
        case "SET_MAXPRICE":
            return { ...state, maxPrice: action.payload };
        case "SET_DIRECT":
            return { ...state, direct: action.payload };
        default:
            return state;
    }
};
