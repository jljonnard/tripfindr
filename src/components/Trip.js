import React from "react";
import { connect } from "react-redux";

import "../css/Trip.css";

import { fetchPhoto, openDetails } from "../actions";
import TripDetails from "./TripDetails";

class Trip extends React.Component {
    componentDidUpdate(prevProps) {
        console.log(this.props.selectedTrip)
        if (prevProps.selectedTrip !== this.props.selectedTrip) {
            this.props.fetchPhoto(
                this.props.selectedTrip.englishCityName,
                window.innerWidth < window.innerHeight ? "portrait" : "landscape"
            );
        }
        if (prevProps.photo !== this.props.photo) {
            document.body.style.backgroundImage = this.props.photo;
        }
    }

    openDetails = () => {
        this.props.openDetails();
        setTimeout(() => {
            document.querySelector(".details-wrap").style.transform = "translateY(-100%)";
        }, 1);
    };

    render() {
        return (
            <div className="trip">
                <h2 className="media price">
                    {this.props.selectedTrip.price}€
                </h2>
                <h2 className="media mainCity">
                    {this.props.selectedTrip.frenchCityName}
                </h2>
                <p className="media country">
                    {this.props.selectedTrip.country}
                </p>
                <p className="media dates">
                    Du {this.props.selectedTrip.outboundLegDate} au{" "}
                    {this.props.selectedTrip.inboundLegDate}
                </p>
                <div className="media" onClick={this.openDetails}>
                    {this.props.areDetailsOpen ? (
                        <div className="asking-details">
                            <i className="material-icons arrow">keyboard_arrow_down</i>
                            Cacher les détails
                            <i className="material-icons arrow">keyboard_arrow_down</i>
                        </div>
                    ) : (
                        <div className="asking-details">
                            <i className="material-icons arrow">keyboard_arrow_up</i>
                            Voir plus de détails
                            <i className="material-icons arrow">keyboard_arrow_up</i>
                        </div>
                    )}
                </div>
                <div className="details-wrap">
                    {this.props.areDetailsOpen && <TripDetails />}
                </div>
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

export default connect(mapStateToProps, { fetchPhoto, openDetails })(Trip);
