import React from "react";
import { connect } from "react-redux";

import Form from "./Form";
import TripList from "./TripList";
import CityCursor from "./CityCursor.js";

import { setVisibilityFilter } from "../actions";

const MainSection = ({ flights, filter, setVisibilityFilter }) => {
    return (
        <div className="page-wrap">
            {window.innerWidth < window.innerHeight && filter === "TRIP_RESULTS" && (
                <div className="changeSearch" onClick={() => setVisibilityFilter("ONLY_FORM")}>
                    Modifier la recherche
                </div>
            )}
            <div className="mainLayout">
                {filter !== "TRIP_RESULTS" && <Form />}
                {flights && filter !== "ONLY_FORM" && <TripList />}
                {filter === "TRIP_RESULTS" && flights && <CityCursor />}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { flights: state.flights, filter: state.filter };
};

export default connect(mapStateToProps, { setVisibilityFilter })(MainSection);
