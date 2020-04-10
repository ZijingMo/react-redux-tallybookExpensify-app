import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
//import { startLogout } from '../../actions/auth';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => { }}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click correctly', () => {
  const startLogout = jest.fn(); // Using spies (mock function)
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

