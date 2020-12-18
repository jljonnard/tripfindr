import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../css/Trip.css";

import TripDetails from "./TripDetails";

import { fetchPhoto, openDetails } from "../actions";

const Trip = () => {
    const selectedTrip = useSelector(state => state.selectedTrip)
    const photo = useSelector(state => state.photo)
    const areDetailsOpen = useSelector(state => state.areDetailsOpen)
    const dispatch = useDispatch()

    //à la création du composant, fait la requête API pour la photo
    useEffect(() => {
        dispatch(fetchPhoto(
            selectedTrip.englishCityName,
            window.innerWidth < window.innerHeight ? "portrait" : "landscape"
        ));
    }, [selectedTrip, dispatch]);

    //une fois que la photo est arrivée, on la met en fond
    useEffect(() => {
        document.body.style.backgroundImage = photo;
    }, [photo]);

    //ouverture des détails avec animation
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
