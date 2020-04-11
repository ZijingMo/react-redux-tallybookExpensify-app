import authReducer from '../../reducers/auth';

test('should login correctly with an id', () => {
  const id = '832lov';
  const action = {
    type: 'LOGIN',
    uid: id
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe('832lov');

});

test('should logout correctly with an id', () => {
  const state = authReducer({uid: '745ieu'}, { type: 'LOGOUT' });
  expect(state).toEqual({});
});