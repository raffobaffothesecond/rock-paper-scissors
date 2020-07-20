/**
 *
 * Returns the state of game settings
 *
 * @param store
 * @return {Function}
 */
export const getGameSettingsState = store => store.GameSettings;

/**
 *
 * Return the playerOne object
 *
 * @param store
 * @return {{score: number, weapon: {}}|initialState.playerOne|{score, weapon}|{score: number}|playerOne|{score}|*}
 */
export const getGameSettingsPlayerOne = store => {

    const gameSettings = getGameSettingsState(store);
    return gameSettings.playerOne;

};

/**
 *
 * Return the playerTwo object
 *
 * @param store
 * @return {{score: number, weapon: {}}|initialState.playerTwo|{score, weapon}|{score: number}|playerTwo|{score}|*}
 */
export const getGameSettingsPlayerTwo = store => {

    const gameSettings = getGameSettingsState(store);
    return gameSettings.playerTwo;

};

/**
 *
 *
 * @param store
 * @return {initialState.gestures|{name, win, icon}}
 */
export const getAvailableWeapons = (store) => {
    const gameSettings = getGameSettingsState(store);
    return gameSettings.gestures;
};

export const getCurrentGame = store => store.CurrentGame;

export const getPlayerOneScore = store => {

    const currentGame = getCurrentGame(store);
    return currentGame.playerOne.score;

};

export const getPlayerTwoScore = store => {

    const currentGame = getCurrentGame(store);
    return currentGame.playerTwo.score;

};

export const getCurrentMatch = store => {

    const currentGame = getCurrentGame(store);
    return currentGame.matchN;

}