/* eslint-disable import/no-anonymous-default-export */
export default (state = 'HOME', action) => {
	switch (action.type) {
		case "SET_VISIBILITY_FILTER":
			return action.payload
		default:
			return state
	}
}