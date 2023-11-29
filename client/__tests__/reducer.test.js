import userReducer from '../reducers/userReducer'
import {loginUser} from '../reducers/userReducer'


describe('userReducer Tests', () => {
  let state;
  let user = {
        username: 'testy mctesterson',
        userId: 1,
        pets: [{name: 'petty mcpet'}]
      }

  beforeEach(() => {
    state = {
      username: null,
      userId: null,
      pets: []
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(userReducer(undefined, { type: undefined })).toEqual(state);
    });

    it('login updates state with user info', () => {
      // const updatedUserState = userReducer(state, loginUser(user),
      // console.log(updatedUserState),
      // expect(updatedUserState).toEqual(user))
      expect(userReducer(state, loginUser(user))).toEqual(user)
    })
  });
});

