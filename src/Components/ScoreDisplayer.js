import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

const ScoreDisplayer = props => {

    return (
        <div className="score-container">
            <p>score</p>
            <h5>{props.playerOneScore}-{props.playerTwoScore}</h5>
        </div>
    );
};

//Props Validation
ScoreDisplayer.propTypes = {

    playerOneScore: PropTypes.number,
    playerTwoScore: PropTypes.number
};


export default ScoreDisplayer;
