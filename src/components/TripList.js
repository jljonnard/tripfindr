import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Trip from "./Trip";

import { setVisibilityFilter } from "../actions";

const TripList = () => {
    const flights = useSelector((state) => state.flights);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    //animation ouverture/fermeture du formulaire
    const updateLayout = (action) => {
        const tripResults = document.querySelector(".tripResults");

        if (action === "open") {
            dispatch(setVisibilityFilter("HOME"));
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
                dispatch(setVisibilityFilter("TRIP_RESULTS"));
            }, 800);
        }
    };

    //image de fond si jamais aucun vol n'a été trouvé
    useEffect(() => {
        if (flights.length === 0) {
            document.body.style.backgroundImage =
                window.innerWidth > window.innerHeight
                    ? "url('https://images.unsplash.com/photo-1594295504608-607714ce9e0e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80')"
                    : "url('https://images.unsplash.com/photo-1544032659-b51fdffab4c6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80')";
        }
    }, [flights.length]);

    return (
        <div className="tripResults">
            {window.innerWidth > window.innerHeight && (
                <div className="clickable showForm">
                    {filter === "HOME" ? (
                        <div onClick={() => updateLayout("close")}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </div>
                    ) : (
                        <div onClick={() => updateLayout("open")}>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </div>
                    )}
                </div>
            )}
            <div>
                {flights.length > 0 ? (
                    <Trip />
                ) : (
                    <div>
                        <h2 className="country">
                            Désolé, aucun vol n'a pu être trouvé selon vos critères de
                            recherche ;(
                        </h2>
                        <p className="dates">Essayez de faire une recherche moins précise pour obtenir plus de résultats</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripList;
