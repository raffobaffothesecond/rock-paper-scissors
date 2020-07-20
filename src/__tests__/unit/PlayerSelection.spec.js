import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme';
import SelectPlayerType from '../../Components/SelectPlayerType';
Enzyme.configure({ adapter: new Adapter() });

describe('ScoreDisplayer', () => {

    const changePlayerMock = jest
        .fn()
        .mockReturnValue('default');


    const props = {
        changePlayer: changePlayerMock,
        selectedPlayer: {type:'computer'}
    };

    test('It displays the correct value on start', () => {

        const wrapper = shallow(
            <SelectPlayerType {...props} />
        );


        expect(wrapper.find('h2').text()).toEqual('Play as');
        expect(wrapper.find('.player-name-container.active').length).toEqual(1);
        expect(wrapper.find('.player-name-container.active').first().text()).toEqual('Computer');


        wrapper.setProps( { selectedPlayer: {type:'human'} });

        expect(wrapper.find('.player-name-container.active').first().text()).toEqual('Human');




    });


    test('On click it calls the changePlayerMock passed in props', () => {
        const wrapper = shallow(
            <SelectPlayerType {...props} />
        );

        wrapper
            .find('.player-name-container')
            .first()
            .at(0)
            .simulate('click');

        expect(changePlayerMock).toHaveBeenCalled();

    });

});