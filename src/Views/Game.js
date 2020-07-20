import React from 'react';
import '../App.css';
import { NextMatch, SetPlay } from "../Redux/Actions";
import EndMatch from "../Redux/MatchJudge"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import {connect} from "react-redux";
import {
    getAvailableWeapons,
    getGameSettingsPlayerOne,
    getGameSettingsPlayerTwo,
    getPlayerOneScore,
    getPlayerTwoScore,
    getCurrentGame, getCurrentMatch
} from "../Redux/Selectors";

import ScoreDisplayer from '../Components/ScoreDisplayer'
import {PlayerScreen} from '../Components/PlayerScreen'
import {ExitGame} from '../Components/GameStorage'

export class GameScreen extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            playerOneReady: false,
            result: 'wait',
            theme: createMuiTheme({
                palette: {
                    primary: {
                        main: '#61dafb',
                        light:'#61dafb',
                        dark: '#61dafb'
                    }
                }
            })


        };

        this.playWeapon = this.playWeapon.bind(this);
        this.nextMatch = this.nextMatch.bind(this);


    }
    async playWeapon(user, weapon)
    {

        if(user === 'playerOne'){  this.setState({playerOneReady: true});  }

        this.props.SetPlay({player: user, content: {weapon: weapon}});
        const result = await this.props.EndMatch(this.props.currentGame);

        this.setState({result: result});

    }

    nextMatch()
    {
        this.setState({playerOneReady: false, result:'wait'});
        this.props.NextMatch()
    }


    gameStatus()
    {
        switch (this.state.result){
            case 'wait':
                return (<p>Waiting for players</p>);

            case 'two':
                return (<h3>Player two wins</h3>);


            case 'one':
                return (<h3>Player one wins</h3>);

            case 'tie':
                return (<h3>Tie!</h3>);

            default:
                return ''
        }
    }


    nextGameButton()
    {
        if(this.state.result !== 'wait') {

            return (
                <Button
                    onClick={this.nextMatch} disabled={this.state.result === 'wait'}
                    variant="contained"
                    color="primary">
                    Next match
                </Button>
            );
        }
        return ''
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <div className="game-screen"   ref={ref => this.gameScreenContainer = ref}>

                    <AppBar position="static" style={{ background: '#161a1f' }}>
                        <Toolbar>
                            <ScoreDisplayer playerOneScore={this.props.playerOneScore} playerTwoScore={this.props.playerTwoScore}/>

                            <div className="exit-button">
                                <Button
                                    onClick={this.props.ExitGame}
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<FaWindowClose />}>
                                      Exit
                                </Button>
                            </div>

                        </Toolbar>
                    </AppBar>

                    <div className="players-container">

                        <div className="player-container">
                            <h5>Player 1</h5>
                            <PlayerScreen gestures={this.props.weapons}
                                          key={'one'+this.props.currentMatch}
                                          canPlay={true}
                                          player={this.props.playerOne.type}
                                      playWeapon={weapon => this.playWeapon('playerOne', weapon)} />
                        </div>


                        <div className="result-container">
                            <div className="result-inner">
                                {this.gameStatus()}
                                {this.nextGameButton()}
                            </div>
                        </div>

                        <div className="player-container">

                            <h5>Player 2</h5>
                            <PlayerScreen gestures={this.props.weapons}
                                          key={'two'+this.props.currentMatch}
                                          canPlay={this.state.playerOneReady}
                                          player={this.props.playerTwo.type}
                                          playWeapon={weapon => this.playWeapon('playerTwo', weapon)} />
                        </div>
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }

}

//Props Validation
GameScreen.propTypes = {

    weapons: PropTypes.array,
    playerOne: PropTypes.object,
    playerTwo: PropTypes.object,
    playerOneScore: PropTypes.number,
    playerTwoScore: PropTypes.number,
    currentGame: PropTypes.object,
    currentMatch: PropTypes.number

};


/**
 * Getting required props from the state
 *
 * @param state
 * @return {{weapons: (initialState.gestures|{name, win, icon}), playerOne: ({score: number, weapon: {}}|initialState.playerOne|{score, weapon}|{score: number}|playerOne|{score}|*), playerTwo: ({score: number, weapon: {}}|initialState.playerTwo|{score, weapon}|{score: number}|playerTwo|{score}|*), playerOneScore: *, currentGame: *, playerTwoScore: *, currentMatch: *}}
 */
const mapStateToProps = state => {


    const weapons = getAvailableWeapons(state);
    const playerOne = getGameSettingsPlayerOne(state);
    const playerTwo = getGameSettingsPlayerTwo(state);
    const playerOneScore = getPlayerOneScore(state);
    const playerTwoScore = getPlayerTwoScore(state);
    const currentGame = getCurrentGame(state);
    const currentMatch = getCurrentMatch(state);


    return { weapons, playerOne, playerTwo, playerOneScore, currentGame, playerTwoScore, currentMatch };

};


export default connect(mapStateToProps,{ NextMatch, SetPlay, EndMatch, ExitGame })(GameScreen);
