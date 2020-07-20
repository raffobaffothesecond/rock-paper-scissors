import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

export class PlayerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'some', block: false };
    }

    componentDidMount()
    {

        if(this.props.canPlay && this.props.player === 'computer'){

            setTimeout(() =>  this.playRandomWeapon(), 1000 )
        }

    }

    componentDidUpdate(prevProps)
    {
        //If is computer player, play random move if prop change to canPlay true
        if(this.props.canPlay && this.props.canPlay !== prevProps.canPlay && this.props.player === 'computer'){
            this.playRandomWeapon();
        }

    }

    /**
     * Triggers the play weapon method on mouse event
     * Disabled for computer player
     *
     * @param weapon
     */
    playWeaponByClick(weapon)
    {
        if(this.props.player === 'computer' || this.state.block){ return }
        return this.playWeapon(weapon);
    }

    /**
     * It selects a random weapon from the available weapons
     * and it plays it
     *
     * Only for computer player
     *
     */
    playRandomWeapon()
    {
        const weapon = [...this.props.gestures]
            .map(a => Object.assign({}, a)).sort(() => 0.5 - Math.random()).pop();
         this.playWeapon(weapon);

    }

    /**
     *
     * Updates the state to hold the selected weapon
     * and Triggers the parent playWeapon method
     *
     * @param weapon
     */
    playWeapon(weapon)
    {
        this.setState({selected: weapon.name, block: true});
        this.props.playWeapon(weapon);
    }

    /**
     *
     * Dynamically creates a class for the weapon gesture (hand sign)
     *
     * @param handSign
     * @return {string}
     */
    handSignClass(handSign)
    {

        let baseClass = this.props.player === 'computer' ? 'hand-sign-container  computer-player' : 'hand-sign-container ';
        baseClass += ( this.state.selected === handSign ) ? ' selected ' : '';
        baseClass += ( this.state.block ) ? ' locked' : '';
        return baseClass;
    }

    displayWeapons()
    {
        const allIcons = this.props.gestures.map((handSign) =>
            <div className={this.handSignClass(handSign.name)} onClick={() => this.playWeaponByClick(handSign)} key={handSign.name} >
                <p className="hand-sign" >
                    <handSign.icon/>
                </p>
            </div>
        );

        return (<div className="gestures-container">{allIcons}</div>)
    }

    render() {

        return (
            <div className="player-screen-container">
                { this.displayWeapons() }
            </div>
        );
    }
}

//Props Validation
PlayerScreen.propTypes = {

    canPlay: PropTypes.bool,
    player: PropTypes.string,
    gestures: PropTypes.array,
    playWeapon: PropTypes.func

};


export default PlayerScreen;
