import { CHANGE_PLAYER } from "../ActionTypes";
import { FaHandRock, FaHandScissors, FaHandPaper, /*FaHandSpock, FaHandLizard */} from 'react-icons/fa';

const initialState = {
    playerOne: {type: 'human' },
    playerTwo: {type: 'computer' },
    gestures: [

        {
            name: 'paper',
            win: ['rock'
                  //,'spock'
                 ],
            icon: FaHandRock
        },
        {
            name: 'scissors',
            win: ['paper'
                  //,'lizard'
                 ],
            icon: FaHandScissors
        },
        {
            name: 'rock',
            win: ['scissors'
                  //,'lizard'
                 ],
            icon: FaHandPaper
        },
        /*
        {
            name: 'spock',
            win: ['scissors','rock'],
            icon: FaHandSpock
        },
        {
            name: 'lizard',
            win: ['spock','paper'],
            icon: FaHandLizard
        }
        */

    ]

};

export default function(state = initialState, action) {

    switch (action.type) {
        case CHANGE_PLAYER: {
            const { player } = action.payload;
            return {
                ...state,
                playerOne: player
            };
        }
        default:
            return state;
    }
}
