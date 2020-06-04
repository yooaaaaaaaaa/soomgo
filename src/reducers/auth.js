import * as types from '../actions';

const initialState = {
  form: {
    email: '',
    pwd: '',
    nickname: '',
    passwordConfirm: ''
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.data.key]: action.data.value
        }
      };
    case types.AUTH_DESTROY:
      return initialState;
    default:
      return state;
  }
}

export default auth;