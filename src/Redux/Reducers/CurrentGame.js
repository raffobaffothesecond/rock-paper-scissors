import { NEXT_MATCH, SET_PLAY, SET_MATCH_RESULT, END_MATCH, SET_MATCH_BACKUP } from "../ActionTypes";

const initialState = {
    matchN: 0,
    playerOne: { score: 0, weapon: {} },
    playerTwo: { score: 0, weapon: {} }
};

export default function(state = initialState, action) {

    switch (action.type) {

        case SET_PLAY: {

            const { playData } = action.payload;
            return {
                ...state,
                [playData.player]: {score: state[playData.player].score, weapon: playData.content.weapon },
            };
        }


        case SET_MATCH_RESULT: {
            const { playData } = action.payload;
            return {
                ...state,
                [playData.player]:{score: playData.score, weapon: state[playData.player].weapon },
            };
        }


        case END_MATCH:{
            return {
                ...state,
                playerOne: {score: 0 },
                playerTwo: {score: 0 },
                matchN: 0
            };
        }

        case SET_MATCH_BACKUP:{

            const { gameData } = action.payload;
            return {
                ...state,
                matchN: gameData.matchN,
                playerOne: gameData.playerOne,
                playerTwo: gameData.playerTwo
            };

        }

        case NEXT_MATCH: {

            return {
                ...state,
                playerOne: {score: state.playerOne.score },
                playerTwo: {score: state.playerTwo.score },
                matchN: state.matchN + 1
            };
        }
        default:
            return state;
    }
}
