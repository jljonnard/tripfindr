import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../css/Trip.css";

import { fetchPhoto, openDetails } from "../actions";
import TripDetails from "./TripDetails";

const Trip = () => {
    const selectedTrip = useSelector(state => state.selectedTrip)
    const photo = useSelector(state => state.photo)
    const areDetailsOpen = useSelector(state => state.areDetailsOpen)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPhoto(
            selectedTrip.englishCityName,
            window.innerWidth < window.innerHeight ? "portrait" : "landscape"
        ));
    }, [selectedTrip, dispatch]);

    useEffect(() => {
        document.body.style.backgroundImage = photo;
    }, [photo]);

    const handleDetails = () => {
        dispatch(openDetails());
        setTimeout(() => {
            document.querySelector(".details-wrap").style.transform = "translateY(-100%)";
        }, 1);
    };

    return (
        <div className="trip">
            <h2 className="media price">{selectedTrip.price}€</h2>
            <h2 className="media mainCity">{selectedTrip.frenchCityName}</h2>
            <p className="media country">{selectedTrip.country}</p>
            <p className="media dates">
                Du {selectedTrip.outboundLegDate} au {selectedTrip.inboundLegDate}
            </p>
            <div className="media" onClick={handleDetails}>
                {areDetailsOpen ? (
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
            <div className="details-wrap">{areDetailsOpen && <TripDetails />}</div>
        </div>
    );
};

export default Trip;
