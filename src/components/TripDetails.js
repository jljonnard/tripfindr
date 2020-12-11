import React from "react";
import { connect } from "react-redux";

import "../css/Trip.css";

import { closeDetails } from "../actions";

import Route from "./Route";

class TripDetails extends React.Component {
  closeDetails = () => {
        document.querySelector(".details-wrap").style.transform = "translateY(+20%)";
        setTimeout(() => {
            this.props.closeDetails();
        }, 600);
    };

    render() {
        return (
            <div className="details">
                <div className="media" onClick={this.closeDetails}>
                    <div className="hide-details">
                        <i className="material-icons dark arrow">keyboard_arrow_down</i>
                        Cacher les détails
                        <i className="material-icons dark arrow">keyboard_arrow_down</i>
                    </div>
                </div>
                <div className="media detailCity">
                    {this.props.selectedTrip.frenchCityName}
                </div>
                <Route
                    carrier={this.props.selectedTrip.outboundLegCarrier}
                    day={this.props.selectedTrip.outboundLegDay}
                    date={this.props.selectedTrip.outboundLegDate}
                    origin={this.props.selectedTrip.originAirport}
                    destination={
                        this.props.selectedTrip.outboundLegAirport
                    }
                    direct={this.props.selectedTrip.direct}
                />
                <Route
                    carrier={this.props.selectedTrip.inboundLegCarrier}
                    day={this.props.selectedTrip.inboundLegDay}
                    date={this.props.selectedTrip.inboundLegDate}
                    origin={this.props.selectedTrip.inboundLegAirport}
                    destination={
                        this.props.selectedTrip.originAirport
                    }
                    direct={this.props.selectedTrip.direct}
                />
                {/*le bouton nous redirige vers le lien qu'on a créé au début du composant*/}
                <a
                    className="button middle normal"
                    href={this.props.selectedTrip.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Consulter l'offre
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flights: state.flights,
        selectedTrip: state.selectedTrip,
        photo: state.photo,
        areDetailsOpen: state.areDetailsOpen,
    };
};

export default connect(mapStateToProps, { closeDetails })(TripDetails);
