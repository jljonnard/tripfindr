import React from "react";
import { connect } from "react-redux";

import Trip from "./Trip.js";

import { setVisibilityFilter } from "../actions";

const TripList = ({ flights, filter, selectedTrip, setVisibilityFilter }) => {
    const updateLayout = (action) => {
        const tripResults = document.querySelector(".tripResults");

        if (action === "open") {
            setVisibilityFilter("HOME");
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
                setVisibilityFilter("TRIP_RESULTS");
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

const mapStateToProps = (state) => {
    return { flights: state.flights, selectedTrip: state.selectedTrip, filter: state.filter };
};

export default connect(mapStateToProps, { setVisibilityFilter })(TripList);
