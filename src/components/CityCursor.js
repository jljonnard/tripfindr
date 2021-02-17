import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { incrementSelectedTrip, decrementSelectedTrip, initSelectedTrip } from "../actions";

const CityCursor = () => {
    const [firstCity, setFirstCity] = useState(0);
    const flights = useSelector((state) => state.flights);
    const selectedTrip = useSelector((state) => state.selectedTrip);
    const dispatch = useDispatch();

    //initialisation de la ville sélectionée + évenement de molette
    useEffect(() => {
        const onScroll = (event) => {
            if (event.deltaY < 0) {
                dispatch(decrementSelectedTrip(flights));
            } else if (event.deltaY > 0) {
                dispatch(incrementSelectedTrip(flights));
            }

            window.removeEventListener("wheel", onScroll);
            setTimeout(() => {
                window.addEventListener("wheel", onScroll);
            }, 300);
        };

        window.addEventListener("wheel", onScroll);
        dispatch(initSelectedTrip(flights));
        return () => {
            window.removeEventListener("wheel", onScroll);
        };
    }, [flights, dispatch]);

    //gestion du déplacement de la ville sélectionée et du groupe de ville
    useEffect(() => {
        console.log(flights)
        console.log(selectedTrip)
        if (selectedTrip.index > 3 && selectedTrip.index < flights.length - 3) {
            setFirstCity(selectedTrip.index - 3);
        } else if (selectedTrip.index < 4) {
            setFirstCity(0);
        } else if (selectedTrip.index > flights.length - 4) {
            setFirstCity(flights.length - 7);
        }
    }, [selectedTrip, flights]);

    return (
        <div className="cities">
            {window.innerWidth < window.innerHeight && (
                //flèche pour les mobiles qui n'ont pas de souris
                <div onClick={() => dispatch(decrementSelectedTrip(flights))}>
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
                //flèche pour les mobiles qui n'ont pas de souris
                <div onClick={() => dispatch(incrementSelectedTrip(flights))}>
                    <i className="clickable material-icons">keyboard_arrow_down</i>
                </div>
            )}
        </div>
    );
};

export default CityCursor;
