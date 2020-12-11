import React from "react";
import { connect } from "react-redux";

import { incrementSelectedTrip, decrementSelectedTrip, initSelectedTrip } from "../actions";

class CityCursor extends React.Component {
    state = {
        firstCity: 0,
    };

    componentDidMount() {
        window.addEventListener("wheel", this.onScroll);
        this.props.initSelectedTrip(this.props.flights);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedTrip !== prevProps.selectedTrip) {
            if (
                this.props.selectedTrip.index > 3 &&
                this.props.selectedTrip.index < this.props.flights.length - 3
            ) {
                this.setState({ firstCity: this.props.selectedTrip.index - 3 });
            } else if (this.props.selectedTrip.index < 4) {
                this.setState({ firstCity: 0 });
            } else if (this.props.selectedTrip.index > this.props.flights.length - 4) {
                this.setState({ firstCity: this.props.flights.length - 7 });
            }
        }
        if (this.props.flights !== prevProps.flights) {
            this.props.initSelectedTrip(this.props.flights);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("wheel", this.onScroll);
    }

    onScroll = (event) => {
        if (event.deltaY < 0) {
            this.props.decrementSelectedTrip(this.props.flights);
        } else if (event.deltaY > 0) {
            this.props.incrementSelectedTrip(this.props.flights);
        }
        window.removeEventListener("wheel", this.onScroll);

        setTimeout(() => {
            window.addEventListener("wheel", this.onScroll);
        }, 300);
    };

    render() {
        return (
            <div className="cities">
                {window.innerWidth < window.innerHeight && (
                    <div onClick={() => this.props.decrementSelectedTrip(this.props.flights)}>
                        <i
                            className={`clickable material-icons ${
                                this.props.selectedTrip.index < 1 && "disabled"
                            }`}
                        >
                            keyboard_arrow_up
                        </i>
                    </div>
                )}
                {this.props.flights
                    .slice(this.state.firstCity, this.state.firstCity + 7)
                    .map((flight, flightId) => (
                        <div
                            key={
                                flight.price +
                                flight.outboundLegDate +
                                flight.inboundLegDate +
                                flight.outboundLegAirportId
                            }
                            className={`city ${
                                this.props.selectedTrip.index ===
                                    flightId + this.state.firstCity && "selected"
                            }`}
                        >
                            {flight.frenchCityName}
                        </div>
                    ))}
                {window.innerWidth < window.innerHeight && (
                    <div onClick={() => this.props.incrementSelectedTrip(this.props.flights)}>
                        <i className="clickable material-icons">keyboard_arrow_down</i>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { flights: state.flights, selectedTrip: state.selectedTrip };
};

export default connect(mapStateToProps, {
    incrementSelectedTrip,
    decrementSelectedTrip,
    initSelectedTrip,
})(CityCursor);
