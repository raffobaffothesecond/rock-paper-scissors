import { CHANGE_PLAYER, NEXT_MATCH, SET_PLAY, SET_MATCH_RESULT, END_MATCH, SET_MATCH_BACKUP } from "./ActionTypes";


export const SelectPlayer = player => ({
    type: CHANGE_PLAYER,
    payload: { player }
});


export const NextMatch = () => ({
    type: NEXT_MATCH
});

export const EndMatch = () => ({
    type: END_MATCH
});


export const SetPlay = playData => ({
    type: SET_PLAY,
    payload: { playData }
});


export const SetMatchResult = playData => ({
    type: SET_MATCH_RESULT,
    payload: { playData }
});


export const SetMatchBackup = gameData => ({
    type: SET_MATCH_BACKUP,
    payload: { gameData }
})