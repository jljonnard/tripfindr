import React from "react";
import { connect } from "react-redux";

import Trip from "./Trip.js";

import { setVisibilityFilter } from "../actions";

class TripList extends React.Component {
    updateLayout = (action) => {
        const tripResults = document.querySelector(".tripResults");

        if (action === "open") {
            this.props.setVisibilityFilter("HOME");
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
                this.props.setVisibilityFilter("TRIP_RESULTS");
            }, 800);
        }
    };

    render() {
        return (
            <div className="tripResults">
                {this.props.flights && window.innerWidth > window.innerHeight && (
                    <div className="clickable showForm">
                        {this.props.filter === "HOME" ? (
                            <div onClick={() => this.updateLayout("close")}>
                                <i className="material-icons">keyboard_arrow_left</i>
                            </div>
                        ) : (
                            <div onClick={() => this.updateLayout("open")}>
                                <i className="material-icons">keyboard_arrow_right</i>
                            </div>
                        )}
                    </div>
                )}
                {this.props.flights && (
                    <div>
                        {/*on génère 'resultsNumber' résultats avec le composant Trip*/}
                        {this.props.selectedTrip && <Trip />}
                        {/*si après requête API, il n'y a pas de vols, on affiche un message*/}
                        {this.props.flights.length === 0 && (
                            <h2 className="align-center">
                                Désolé, aucun vol n'a pu être trouvé selon vos critères de
                                recherches ;(
                            </h2>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { flights: state.flights, selectedTrip: state.selectedTrip, filter: state.filter };
};

export default connect(mapStateToProps, { setVisibilityFilter })(TripList);
