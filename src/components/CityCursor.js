import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { incrementSelectedTrip, decrementSelectedTrip, initSelectedTrip } from "../actions";

const CityCursor = ({
    flights,
    selectedTrip,
    incrementSelectedTrip,
    decrementSelectedTrip,
    initSelectedTrip,
}) => {
    const [firstCity, setFirstCity] = useState(0);

    useEffect(() => {
        if (selectedTrip.index > 3 && selectedTrip.index < flights.length - 3) {
            setFirstCity(selectedTrip.index - 3);
        } else if (selectedTrip.index < 4) {
            setFirstCity(0);
        } else if (selectedTrip.index > flights.length - 4) {
            setFirstCity(flights.length - 7);
        }
    }, [selectedTrip, flights]);

    useEffect(() => {
        const onScroll = (event) => {
            if (event.deltaY < 0) {
                decrementSelectedTrip(flights);
            } else if (event.deltaY > 0) {
                incrementSelectedTrip(flights);
            }

            window.removeEventListener("wheel", onScroll);
            setTimeout(() => {
                window.addEventListener("wheel", onScroll);
            }, 300);
        };

        window.addEventListener("wheel", onScroll);
        initSelectedTrip(flights);
        return () => {
            window.removeEventListener("wheel", onScroll);
        };
    }, [flights, initSelectedTrip, incrementSelectedTrip, decrementSelectedTrip]);

    return (
        <div className="cities">
            {window.innerWidth < window.innerHeight && (
                <div onClick={() => decrementSelectedTrip(flights)}>
                    <i
                        className={`clickable material-icons ${
                            selectedTrip.index < 1 && "disabled"
                        }`}
                    >
                        keyboard_arrow_up
                    </i>
                </div>
            )}
            {flights.slice(firstCity, firstCity + 7).map((flight, flightId) => (
                <div
                    key={
                        flight.price +
                        flight.outboundLegDate +
                        flight.inboundLegDate +
                        flight.outboundLegAirportId
                    }
                    className={`city ${
                        selectedTrip.index === flightId + firstCity && "selected"
                    }`}
                >
                    {flight.frenchCityName}
                </div>
            ))}
            {window.innerWidth < window.innerHeight && (
                <div onClick={() => incrementSelectedTrip(flights)}>
                    <i className="clickable material-icons">keyboard_arrow_down</i>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { flights: state.flights, selectedTrip: state.selectedTrip };
};

export default connect(mapStateToProps, {
    incrementSelectedTrip,
    decrementSelectedTrip,
    initSelectedTrip,
})(CityCursor);
