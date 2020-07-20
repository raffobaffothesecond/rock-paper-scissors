import { SetMatchResult } from './Actions'
import { getCurrentGame, getGameSettingsState } from "./Selectors";
import { StoreGame } from '../Components/GameStorage'

export const DecideWinner = () =>
{

    return async (dispatch, getState) =>  {

        const state = getState();
        const currentGame = getCurrentGame(state);

        if(Object.keys(currentGame.playerOne).length === 0 || ! currentGame.playerOne.weapon  ) { return 'wait'}
        if(Object.keys(currentGame.playerTwo).length === 0 || ! currentGame.playerTwo.weapon  ) { return 'wait'}

        //tie
        if(currentGame.playerOne.weapon.name === currentGame.playerTwo.weapon.name){

            dispatch(SetMatchResult({player: 'playerOne', score: currentGame.playerOne.score } ));
            dispatch(SetMatchResult({player: 'playerTwo', score: currentGame.playerTwo.score } ));
            const updState = getState();
            const updatedGame = getCurrentGame(updState);
            const gameSettings = getGameSettingsState(updState);
            await StoreGame(updatedGame, gameSettings);
            return 'tie';
        }

        if(currentGame.playerOne.weapon.win.indexOf(currentGame.playerTwo.weapon.name) > -1)
        {
            dispatch(SetMatchResult({player: 'playerTwo', score: currentGame.playerTwo.score + 1} ))
            const updState = getState();
            const updatedGame = getCurrentGame(updState);
            const gameSettings = getGameSettingsState(updState);
            await StoreGame(updatedGame, gameSettings);
            return 'two'

        }

        dispatch(SetMatchResult({player: 'playerOne', score: currentGame.playerOne.score + 1} ))
        const updState = getState();
        const updatedGame = getCurrentGame(updState);
        const gameSettings = getGameSettingsState(updState);
        await StoreGame(updatedGame, gameSettings);
        return 'one'

    }
};




export default DecideWinner;