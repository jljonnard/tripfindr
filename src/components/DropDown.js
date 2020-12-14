import React from "react";
import { useDispatch } from "react-redux";

const DropDown = ({ possibilities, labelTitle, setValue }) => {
    const dispatch = useDispatch();

    const handleClick = (event) => {
        let correspondingValue = "";
        possibilities.forEach((possibility) => {
            if (event.target.value === possibility.title) {
                correspondingValue = possibility.value;
            }
        });
        dispatch(setValue(correspondingValue));
    };

    return (
        <div>
            <label>{labelTitle}</label>
            <select onChange={handleClick} className="select-wrapper">
                {possibilities.map((possibility) => (
                    <option key={possibility.value}>{possibility.title}</option>
                ))}
            </select>
        </div>
    );
};
export default DropDown;
