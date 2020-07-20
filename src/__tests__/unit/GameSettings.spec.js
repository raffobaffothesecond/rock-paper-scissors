import * as actions from '../../Redux/Actions'
import * as types from '../../Redux/ActionTypes'
import * as GameSettingsReducer from '../../Redux/Reducers/GameSettings'

describe('actions', () => {

    it('should create an action to change player', () => {

        const payload = { player: 'Computer'};
        const expectedAction = {
            type: types.CHANGE_PLAYER,
            payload
        };

        expect(actions.SelectPlayer('Computer')).toEqual(expectedAction)
    })
})


describe('reducers', () => {

    it('should give equal opportunities of loosing', () => {

        const reducer = GameSettingsReducer.default(undefined, {});
        const allWeapons = reducer.gestures;

        const weaponsScore = allWeapons.reduce((acc, currentWeapon) => {

            acc[currentWeapon.name] = 0;
            return acc;

        }, {});


        allWeapons.forEach(weapon => {
            allWeapons
                .filter(x => x.name !== weapon.name)
                .forEach(enemy => {
                    if(enemy.win.includes(weapon.name)) weaponsScore[weapon.name] += 1;
            })
        });


        const equalOpportunities = Object.values(weaponsScore).every( v => v === Object.values(weaponsScore)[0] );

        expect(equalOpportunities).toEqual(true)
    })
});