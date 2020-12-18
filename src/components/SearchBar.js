import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../css/AutoCompleteInput.css";

const SearchBar = ({ id, labelTitle, results, presetValue="", setValue, firstResult="" }) => {
    const [resultsList, setResultsList] = useState([]);
    const [search, setSearch] = useState(presetValue.title);
    const [selectedResult, setSelectedResult] = useState(-1);
    const dispatch = useDispatch()

    //si l'utilisateur clique en dehors du champ on enleve les résultats de recherche
    const handleAllClicks = (event) => {
        if (event.target.className !== "searchBar") {
            reset();
        }
    }; 

    //navigation dans les résultats avec le clavier
    const handleKeyboard = (event) => {
        if (event.key === "Tab") {
            reset();
        }

        if (resultsList.length > 0) {
            switch (event.key) {
                case "ArrowDown":
                    if (selectedResult < resultsList.length - 1) {
                        setSelectedResult(selectedResult + 1);
                    }
                    break;
                case "ArrowUp":
                    if (selectedResult > -1) {
                        setSelectedResult(selectedResult - 1);
                    }
                    break;
                case "Enter":
                    if (selectedResult > -1) {
                        handleClick(resultsList[selectedResult]);
                    } else {
                        handleClick(resultsList[0]);
                    }
                    break;
                default:
                    setSelectedResult(-1);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleAllClicks);
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("click", handleAllClicks);
            document.removeEventListener("keydown", handleKeyboard);
        };
    });

    //fonction qui permet de donner aux résultats la même largeur que le champ input
    const resizeResults = (search) => {
        const wrapper = document.querySelector("#searchWrapper-" + id);
        let resultsSpace = document.querySelector(".results." + id);

        if (resultsSpace) {
            resultsSpace.style.width = wrapper.offsetWidth + "px";
            resultsSpace.style.top = wrapper.offsetTop + wrapper.offsetHeight + "px";
            resultsSpace.style.left = wrapper.offsetLeft + "px";

            if (search.length > 2) {
                resultsSpace.style.display = "block";
            } else {
                resultsSpace.style.display = "none";
            }
        }
    };

    //création des suggestions de recherche
    const handleSearchUpdate = (event) => {
        resizeResults(event.target.value);
        let resultsToShow = [];

        if (event.target.value.length > 2) {
            resultsToShow = results.filter((result) =>
                result.title.toUpperCase().includes(search.toUpperCase())
            );
            setResultsList(resultsToShow);
            setSearch(event.target.value);
            setSelectedResult(-1);
        } else {
            setResultsList([]);
            setSearch(event.target.value);
            setSelectedResult(-1);
        }
    };

    //lorqu'un résultat est choisi
    const handleClick = (chosenResult) => {
        reset();
        setSearch(chosenResult.title);
        dispatch(setValue(chosenResult));
    };

    //réinitialisation des variables d'état et suppression de l'affichage de résultats
    const reset = () => {
        setResultsList([]);
        setSelectedResult(-1);
        resizeResults("");
    };

    return (
        <div className="autoCompleteInputWrapper">
            <label>{labelTitle}</label>
            <input
                className="autoCompleteInputField"
                id={`searchWrapper-${id}`}
                type="text"
                placeholder={firstResult}
                onChange={handleSearchUpdate}
                value={search}
            ></input>
            <div className={`results ${id}`}>
                {resultsList.map((result, id) => (
                    <div
                        className={`result ${selectedResult === id && "selected"}`}
                        key={result.value}
                        onClick={() => handleClick(result)}
                    >
                        {result.title}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default SearchBar;
