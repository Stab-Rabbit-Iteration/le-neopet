

import userReducer from '../reducers.js'

console.log(userReducer.loginUser);

/**
 * One of the main benefits of reducers is how testable they are. Since they're
 * pure (in theory), all we have to do is look at the inputs and outputs. We
 * can also add some tests to determine if the reducer really is pure!
 */
describe('userReducer Tests', () => {
  let state;

  beforeEach(() => {
    state = {
      username: null,
      userId: null,
      pets: []
    };
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });
});

