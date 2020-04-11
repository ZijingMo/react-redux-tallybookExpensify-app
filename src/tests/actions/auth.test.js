import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
  const id = 'uye039'
  const action = login(id);
  expect(action).toEqual({
    type: 'LOGIN',
    uid: id
  });
});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});