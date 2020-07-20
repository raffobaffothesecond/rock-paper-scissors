import React from 'react';
import { connect } from "react-redux";
import { getGameSettingsPlayerOne } from "../Redux/Selectors";
import { SelectPlayer, NextMatch } from "../Redux/Actions";
import Button from '@material-ui/core/Button';
import PlayerSelection from '../Components/SelectPlayerType'
import {StartFromBackup} from '../Components/GameStorage'
import '../App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export class StartScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlayer: "computer",
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
    }

    componentDidMount()
    {
        this.props.StartFromBackup()
    }


    changePlayer = player => {
        this.props.SelectPlayer({ type:player, score:0});
        this.setState({ selectedPlayer: player });
    };


    startGame = () => {
        this.props.NextMatch();
    };


    render() {
        return (

            <MuiThemeProvider theme={this.state.theme}>

                <div className="StartScreenContainer">

                    <PlayerSelection
                        selectedPlayer={ this.props.player }
                        changePlayer={ this.changePlayer } />

                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={ this.startGame }>

                                Start
                        </Button>

                </div>
            </MuiThemeProvider>

        );
    }
}

const mapStateToProps = state => {

    const player = getGameSettingsPlayerOne(state);
    return { player };

};

export default connect(mapStateToProps, { SelectPlayer, NextMatch, StartFromBackup } )(StartScreen);
