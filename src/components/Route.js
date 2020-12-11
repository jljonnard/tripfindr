import React from "react";

import "../css/Trip.css";

const Route = ({ carrier, day, date, origin, destination, direct }) => {
    return (
        <div className="flight">
            <p className="carrier">{carrier}</p>
            <p className="date">
                {day} {date}
            </p>
            <div className="route">
                <p className="airport">{origin}</p>
                <i className="material-icons">trending_flat</i>
                <p className="airport">{destination}</p>
            </div>
            <p className="direct">{direct ? "Direct" : "Avec escales"}</p>
        </div>
    );
};

export default Route;
