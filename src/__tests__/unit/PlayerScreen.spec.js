import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme'
import PlayerScreen from '../../Components/PlayerScreen'
import {FaHandPaper, FaHandRock, FaHandScissors} from "react-icons/fa/index";

Enzyme.configure({ adapter: new Adapter() });

describe('ScoreDisplayer', () => {


    const playWeapon = jest
        .fn()
        .mockReturnValue('default');


    const props = {
        playWeapon: playWeapon,
        player:'human',
        gestures: [
            {
                name: 'paper',
                win: ['rock','spock'],
                icon: FaHandRock
            },
            {
                name: 'scissors',
                win: ['paper','lizard'],
                icon: FaHandScissors
            },
            {
                name: 'rock',
                win: ['scissors','lizard'],
                icon: FaHandPaper
            },
        ],
        selectedPlayer: {type:'computer'}
    };

    test('It displays all the gestures passed in the array', () => {
        const wrapper = shallow(
            <PlayerScreen {...props} />
        );

        expect(wrapper.find('.hand-sign').length).toEqual(props.gestures.length);

    });

    test('It fires the prop function when clicked', () => {
        const wrapper = shallow(
            <PlayerScreen {...props} />
        );


        wrapper
            .find('.hand-sign-container')
            .first()
            .at(0)
            .simulate('click');

        expect(playWeapon).toHaveBeenCalled();

    });



});



describe('ScoreDisplayer computer side', () => {


    const playWeapon = jest
        .fn()
        .mockReturnValue('default');


    const props = {
        playWeapon: playWeapon,
        player:'computer',
        canPlay: false,
        gestures: [
            {
                name: 'paper',
                win: ['rock','spock'],
                icon: FaHandRock
            },
            {
                name: 'scissors',
                win: ['paper','lizard'],
                icon: FaHandScissors
            },
            {
                name: 'rock',
                win: ['scissors','lizard'],
                icon: FaHandPaper
            },
        ],
        selectedPlayer: {type:'computer'}
    };



    test('It prevent from firing the prop function when clicked and player is computer', () => {


        const wrapper = shallow(
            <PlayerScreen {...props} />
        );

        wrapper
            .find('.hand-sign-container')
            .first()
            .at(0)
            .simulate('click');

        expect(playWeapon).not.toHaveBeenCalled();

    });

    test('It does not play a move automatically if opponent is not ready', () => {

        jest.useFakeTimers();

        const wrapper = shallow(
            <PlayerScreen {...props} />
        );

        expect(playWeapon).not.toHaveBeenCalled();


        jest.advanceTimersByTime(2000);


        //component has a timeout Too
        expect(playWeapon).not.toHaveBeenCalled();



    });

    test('It plays a move automatically if opponent is ready', () => {

        jest.useFakeTimers();

        const wrapper = shallow(
            <PlayerScreen {...props} />
        );

        expect(playWeapon).not.toHaveBeenCalled();

        wrapper.setProps({ canPlay: true });

        jest.advanceTimersByTime(2000);


        //component has a timeout Too
        expect(playWeapon).toHaveBeenCalled();



    });


});