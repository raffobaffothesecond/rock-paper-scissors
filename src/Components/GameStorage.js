import { SetMatchBackup, EndMatch, SelectPlayer } from "../Redux/Actions";

const storageKey = 'rf-rock-paper-scissors';


/**
 *
 * Store game data to localStorage
 *
 * @param game
 * @param gameSettings
 * @return {Promise<any>}
 * @constructor
 */
export const StoreGame = (game, gameSettings) =>
{

    return new Promise((resolve, reject) => {

        try {

            const toSave = { game: game, gameSettings: gameSettings };
            const storagePayload = JSON.stringify(toSave);

            localStorage.setItem(storageKey, storagePayload);
            resolve()

        } catch (e)
        {
            //needs error handling...
            console.log(e);
            reject(e)
        }

    });
};


/**
 * If exists a saved game it starts from the last achieved result
 *
 * @return {Function}
 * @constructor
 */
export const StartFromBackup = () => {


    return async dispatch => {

       const gameObj = await GetExistingGame();

       if(gameObj){

           dispatch( SelectPlayer( { type: gameObj.gameSettings.playerOne.type }));
           dispatch( SetMatchBackup({matchN: gameObj.game.matchN, playerOne: gameObj.game.playerOne, playerTwo: gameObj.game.playerTwo } ));

       }

    };

};


/**
 *
 * Delete the stored game data and
 * dispatch exit from current game
 *
 * @return {Function}
 * @constructor
 */
export const ExitGame = () => {


    return async dispatch => {

        DeleteExistingGame();
        dispatch(EndMatch());

    };

};


/**
 *
 * Deletes game data from the localStorage
 *
 * @constructor
 */
const DeleteExistingGame = () => {

    localStorage.removeItem(storageKey);

};


/**
 *
 * Tries to get a saved game from local storage
 *
 * @return {Promise<any>}
 * @constructor
 */
export const GetExistingGame = async () =>
{
    const game = localStorage.getItem(storageKey);
    if(!game){ return }

    return new Promise((resolve ) => {

        try {
                const gameObj = JSON.parse(game);
                resolve(gameObj);

        } catch (e)
        {
            //needs error handling...
            console.log(e);
        }

    });
};



export default {StoreGame, StartFromBackup};