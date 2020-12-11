import { skyscannerAPI, unsplashAPI } from "../apis";
import { skyScannerKey, unsplashKey } from "../apis/keys";

export const fetchFlights = (fields) => async (dispatch) => {
    const frenchResponse = await skyscannerAPI.get(
        "/fr-FR/" +
            fields.origin +
            "/" +
            fields.destination +
            "/" +
            fields.season +
            "/" +
            fields.season,
        {
            headers: {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": skyScannerKey,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );

    const englishResponse = await skyscannerAPI.get(
        "/en-UK/" +
            fields.origin +
            "/" +
            fields.destination +
            "/" +
            fields.season +
            "/" +
            fields.season,
        {
            headers: {
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                "x-rapidapi-key": skyScannerKey,
                "Access-Control-Allow-Origin": "*",
            },
        }
    );

    dispatch({
        type: "FETCH_FLIGHTS",
        payload: {
            fields: fields,
            fr: frenchResponse,
            en: englishResponse,
        },
    });
};

export const fetchPhoto = (city, orientation) => async (dispatch) => {
    const response = await unsplashAPI.get("",{
        params: {
            query: city,
            per_page: 1,
            orientation: orientation,
        },
        headers: {
            Authorization: unsplashKey,
        },
    });

    dispatch({
        type: "FETCH_PHOTO",
        payload: response,
    });
};

export const setOrigin = (newOrigin) => ({
    type: "SET_ORIGIN",
    payload: newOrigin,
});
export const setDestination = (newDestination) => ({
    type: "SET_DESTINATION",
    payload: newDestination,
});
export const setSeason = (newSeason) => ({
    type: "SET_SEASON",
    payload: newSeason,
});
export const setRange = (newRange) => ({
    type: "SET_RANGE",
    payload: newRange,
});
export const setMinPrice = (newMinPrice) => ({
    type: "SET_MINPRICE",
    payload: newMinPrice,
});
export const setMaxPrice = (newMaxPrice) => ({
    type: "SET_MAXPRICE",
    payload: newMaxPrice,
});
export const setDirect = (newDirect) => ({
    type: "SET_DIRECT",
    payload: newDirect,
});

export const setVisibilityFilter = (filter) => ({
    type: "SET_VISIBILITY_FILTER",
    payload: filter,
});

export const incrementSelectedTrip = (flights) => ({
    type: "INCREMENT_SELECTED_TRIP",
    payload: flights,
});
export const decrementSelectedTrip = (flights) => ({
    type: "DECREMENT_SELECTED_TRIP",
    payload: flights,
});
export const initSelectedTrip = (flights) => ({
    type: "INIT_SELECTED_TRIP",
    payload: flights,
});

export const openDetails = () => ({
    type: "OPEN_DETAILS",
});
export const closeDetails = () => ({
    type: "CLOSE_DETAILS",
});
export const switchDetails = () => ({
    type: "SWITCH_DETAILS",
});