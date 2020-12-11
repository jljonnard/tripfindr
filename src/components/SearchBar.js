import React from "react";
import { connect } from "react-redux";

import "../css/AutoCompleteInput.css";

class SearchBar extends React.Component {
    state = {
        results: [],
        search: "",
        selectedResult: -1,
    };

    componentDidMount() {
        document.addEventListener("click", this.handleAllClicks);
        document.addEventListener("keydown", this.handleKeyboard);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleAllClicks);
        document.removeEventListener("keydown", this.handleKeyboard);
    }

    handleAllClicks = (event) => {
        if (event.target.className !== "searchBar") {
            this.reset();
        }
    };

    handleKeyboard = (event) => {
        if (event.key === "Tab") {
            this.reset();
        }

        if (this.state.results.length > 0) {
            switch (event.key) {
                case "ArrowDown":
                    if (this.state.selectedResult < this.state.results.length - 1) {
                        this.setState({ selectedResult: this.state.selectedResult + 1 });
                    }
                    break;
                case "ArrowUp":
                    if (this.state.selectedResult > -1) {
                        this.setState({ selectedResult: this.state.selectedResult - 1 });
                    }
                    break;
                case "Enter":
                    if (this.state.selectedResult > -1) {
                        this.handleClick(this.state.results[this.state.selectedResult]);
                    } else {
                        this.handleClick(this.state.results[0]);
                    }
                    break;
                default:
                    this.setState({ selectedResult: -1 });
            }
        }
    };

    resizeResults(search) {
        //fonction qui permet de donner aux résultats la même largeur que le champ input
        const wrapper = document.querySelector("#searchWrapper-" + this.props.id);
        let resultsSpace = document.querySelector(".results." + this.props.id);

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
    }

    handleSearchUpdate = (event) => {
        this.resizeResults(event.target.value);
        let results = [];

        if (event.target.value.length > 2) {
            results = this.props.results.filter((result) =>
                result.title.toUpperCase().includes(this.state.search.toUpperCase())
            );
            this.setState({
                results: results,
                search: event.target.value,
                selectedResult: -1,
            });
        } else {
            this.setState({ results: [], search: event.target.value, selectedResult: -1 });
        }
    };

    handleClick(chosenResult) {
        this.reset();
        this.setState({ search: chosenResult.title });
        this.props.setValue(chosenResult.value);
    }

    reset() {
        this.setState({ results: [], selectedResult: -1 });
        this.resizeResults("");
    }

    render() {
        return (
            <div className="autoCompleteInputWrapper">
                <label>{this.props.labelTitle}</label>
                <input
                    className="autoCompleteInputField"
                    id={`searchWrapper-${this.props.id}`}
                    type="text"
                    placeholder={this.props.firstResult || ""}
                    onChange={this.handleSearchUpdate}
                    value={this.state.search}
                ></input>
                <div className={`results ${this.props.id}`}>
                    {this.state.results.map((result, id) => (
                        //on affiche un tableau des résultats contenant la recherche qu'importe la casse
                        <div
                            className={`result ${
                                this.state.selectedResult === id && "selected"
                            }`}
                            key={result.value}
                            onClick={() => this.handleClick(result)}
                        >
                            {result.title}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { possibilities: state.possibilities };
};

export default connect(mapStateToProps)(SearchBar);
