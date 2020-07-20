import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mount, shallow} from 'enzyme'
import ScoreDisplayer from '../../Components/ScoreDisplayer'

Enzyme.configure({ adapter: new Adapter() });

describe('ScoreDisplayer', () => {

    const props = {
        playerOneScore: 1,
        playerTwoScore: 2
    };

    test('It has score description', () => {
        const wrapper = shallow(
            <ScoreDisplayer {...props} />
        );
        expect(wrapper.find('p').text()).toEqual('score');
    });

    test('It displays the score with a minus between the scores', () => {
        const wrapper = shallow(
            <ScoreDisplayer {...props} />
        );
        expect(wrapper.find('h5').text()).toEqual('1-2');
    });


});