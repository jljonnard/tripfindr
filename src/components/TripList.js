import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Trip from "./Trip.js";

import { setVisibilityFilter } from "../actions";

const TripList = () => {
    const flights = useSelector(state => state.flights)
    const filter = useSelector(state => state.filter)
    const selectedTrip = useSelector(state => state.selectedTrip)
    const dispatch = useDispatch()

    const updateLayout = (action) => {
        const tripResults = document.querySelector(".tripResults");

        if (action === "open") {
            dispatch(setVisibilityFilter("HOME"));
            tripResults.style.width = "55%";
            setTimeout(() => {
                document.querySelector(".search").style.transform = "translateX(0.1%)";
            }, 1);
        } else if (action === "close") {
            document.querySelector(".search").style.transform = "translateX(-100%)";
            tripResults.style.opacity = "0";
            tripResults.style.width = "100%";

            setTimeout(() => {
                tripResults.style.opacity = "1";
                dispatch(setVisibilityFilter("TRIP_RESULTS"));
            }, 800);
        }
    };

    return (
        <div className="tripResults">
            {flights && window.innerWidth > window.innerHeight && (
                <div className="clickable showForm">
                    {filter === "HOME" ? (
                        <div onClick={() => updateLayout("close")}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </div>
                    ) : (
                        <div onClick={() => updateLayout("open")}>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </div>
                    )}
                </div>
            )}
            {flights && (
                <div>
                    {selectedTrip && <Trip />}
                    {flights.length === 0 && (
                        <h2 className="align-center">
                            Désolé, aucun vol n'a pu être trouvé selon vos critères de
                            recherches ;(
                        </h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default TripList;
