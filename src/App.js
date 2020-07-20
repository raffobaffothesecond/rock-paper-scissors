import React from 'react';
import './App.css';

import StartScreen from './Views/Start'
import GameScreen from './Views/Game'
import {connect} from "react-redux";
import {getCurrentGame} from "./Redux/Selectors";


function App(props) {


    function Screen() {
        if(Number(props.currentGame.matchN) !== 0) { return <GameScreen />; }

            return (
                <StartScreen />
            );

    }

   return (
     <div className="App">
         {Screen()}
    </div>
  );
}

const mapStateToProps = state => {

    const currentGame = getCurrentGame(state);
    return { currentGame };

};

export default connect(mapStateToProps)(App);
