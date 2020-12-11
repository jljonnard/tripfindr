import React from "react";
import { connect } from "react-redux";

import Form from "./Form";
import TripList from "./TripList";
import CityCursor from "./CityCursor.js";

import { setVisibilityFilter } from "../actions";

class MainSection extends React.Component {
    render() {
        return (
            <div className="page-wrap">
                {this.props.filter === "TRIP_RESULTS" &&
                    window.innerWidth < window.innerHeight && (
                        <div
                            className="changeSearch"
                            onClick={() => this.props.setVisibilityFilter("ONLY_FORM")}
                        >
                            Modifier la recherche
                        </div>
                    )}
                <div className="mainLayout">
                    {this.props.filter !== "TRIP_RESULTS" && <Form />}

                    {this.props.flights && this.props.filter !== "ONLY_FORM" && <TripList />}
                    {this.props.filter === "TRIP_RESULTS" && this.props.flights && (
                        <CityCursor />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { flights: state.flights, filter: state.filter };
};

export default connect(mapStateToProps, { setVisibilityFilter })(MainSection);
