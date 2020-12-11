/* eslint-disable import/no-anonymous-default-export */
export default (state = "", action) => {
    switch (action.type) {
        case "FETCH_PHOTO":
            return action.payload.data.total > 0
                ? "url(" + action.payload.data.results[0].urls.regular + ")"
                : "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80')";
        default:
            return state;
    }
};
