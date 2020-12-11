import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

class DropDown extends React.Component {
    handleClick = (event) => {
		let correspondingValue = ''
		this.props.possibilities.forEach((possibility) => {
			if(event.target.value === possibility.title) {
				correspondingValue = possibility.value
			}
		})
        this.props.setValue(correspondingValue);
    };

    render() {
        return (
            <div>
                <label>{this.props.labelTitle}</label>
                <select onChange={this.handleClick} className="select-wrapper">
                    {this.props.possibilities.map((possibility) => (
                        <option key={possibility.value}>
                            {possibility.title}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

DropDown.propTypes = {
    labelTitle: PropTypes.string.isRequired, //le titre du champ
    possibilities: PropTypes.arrayOf(
        //la liste des options qui seront affichées
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            value: PropTypes.isRequired,
        })
    ).isRequired,
};

const mapStateToProps = (state) => {
    return { flights: state.flights };
};

export default connect(mapStateToProps)(DropDown);
