import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

function PlayerSelection(props) {


   function ChangeSelection(selected) {

       props.changePlayer(selected)
   }

    return (
        <div className="player-selection-container">

            <h2 className="play-as">Play as</h2>
            <div className="Player-selection-inner">

                <div className={'player-name-container '+ (props.selectedPlayer.type  === 'human' ? 'active' : '')}
                     onClick={ () => ChangeSelection('human') }>
                     <p>Human</p>
                </div>

                <div className={'player-name-container '+ (props.selectedPlayer.type  === 'computer' ? 'active' : '')}
                     onClick={ () => ChangeSelection('computer') }>
                <p>Computer</p>

                </div>
            </div>
        </div>
    );
}

//Props Validation
PlayerSelection.propTypes = {

    selectedPlayer: PropTypes.object
};



export default PlayerSelection;
