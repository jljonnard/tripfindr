import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import TripList from "./TripList";
import CityCursor from "./CityCursor.js";

import { setVisibilityFilter } from "../actions";

const MainSection = () => {
    const flights = useSelector((state) => state.flights);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    return (
        <div className="page-wrap">
            {window.innerWidth < window.innerHeight && filter === "TRIP_RESULTS" && (
                <div
                    className="changeSearch"
                    onClick={() => dispatch(setVisibilityFilter("ONLY_FORM"))}
                >
                    Modifier la recherche
                </div>
            )}
            <div className="mainLayout">
                {filter !== "TRIP_RESULTS" && <Form />}
                {filter !== "ONLY_FORM" && flights && <TripList />}
                {filter === "TRIP_RESULTS" && flights && flights.length > 0 && <CityCursor />}
            </div>
        </div>
    );
};

export default MainSection;
