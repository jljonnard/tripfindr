import React from "react";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "./DropDown.js";
import SearchBar from "./SearchBar";

import {
    fetchFlights,
    setOrigin,
    setDestination,
    setSeason,
    setRange,
    setMinPrice,
    setMaxPrice,
    setDirect,
    setVisibilityFilter,
} from "../actions";

import { airports, countries, seasons, ranges } from "../utilities/constants.js";

const Form = () => {
    const fields = useSelector((state) => state.fields);
    const dispatch = useDispatch();

    const submitForm = () => {
        if (checkForm()) {
            console.log(fields);
            dispatch(fetchFlights(fields));
            if (document.querySelector(".tripResults")) {
                document.querySelector(".tripResults").style.width = "100%";
            }
            document.querySelector(".search").style.transform = "translateX(-100%)";
            setTimeout(() => {
                dispatch(setVisibilityFilter("TRIP_RESULTS"));
            }, 700);
        }
    };

    const checkForm = () => {
        if (fields.origin) {
            document.querySelector(".alert").style.display = "none";
            return true;
        } else {
            document.querySelector(".alert").style.display = "block";
            return false;
        }
    };

    return (
        <div className="search">
            <form className="gallery form">
                <div className="field solo">
                    <SearchBar
                        id="origin"
                        labelTitle="Lieu de départ"
                        results={airports}
                        presetValue={fields.origin}
                        setValue={setOrigin}
                    />
                    <span className="alert">Veuillez sélectionner un aéroport</span>
                </div>
                <div className="field solo">
                    <SearchBar
                        id="destination"
                        labelTitle="Pays"
                        results={countries}
                        firstResult="Sans préférence"
                        presetValue={fields.destination}
                        setValue={setDestination}
                    />
                    <span className="alert">
                        Veuillez sélectionner un pays ou laisser le champ vide
                    </span>
                </div>
                <div className="field half first">
                    <DropDown
                        labelTitle="Période"
                        possibilities={seasons}
                        presetValue={fields.season}
                        setValue={setSeason}
                    />
                </div>
                <div className="field half">
                    <DropDown
                        labelTitle="Durée du voyage"
                        possibilities={ranges}
                        presetValue={fields.range}
                        setValue={setRange}
                    />
                </div>
                <div className="field half first">
                    <label>Prix Min</label>
                    <input
                        type="text"
                        placeholder="Aucun"
                        onChange={(event) =>
                            dispatch(setMinPrice(parseInt(event.target.value)))
                        }
                        value={fields.minPrice}
                    />
                </div>
                <div className="field half">
                    <label>Prix Max</label>
                    <input
                        type="text"
                        placeholder="Sans limite"
                        onChange={(event) =>
                            dispatch(setMaxPrice(parseInt(event.target.value)))
                        }
                        value={fields.maxPrice}
                    />
                </div>
                <div className="field solo">
                    {fields.direct ? (
                        <input
                            type="checkbox"
                            name="direct"
                            onChange={(event) => dispatch(setDirect(event.target.checked))}
                            checked
                        />
                    ) : (
                        <input
                            type="checkbox"
                            name="direct"
                            onChange={(event) => dispatch(setDirect(event.target.checked))}
                        />
                    )}
                    <label htmlFor="direct">Direct seulement</label>
                </div>
                <div className="field solo">
                    <div onClick={submitForm} className="button big middle">
                        Trouver un voyage
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
