import { createAction, handleActions } from 'redux-actions';

const SET_FORM = 'auth/SET_FORM';
const DESTROY = 'auth/DESTROY'

const initialState = {
  form: {
    email: '',
    pwd: '',
    nickname: '',
    passwordConfirm: ''
  }
};

export const setForm = createAction(SET_FORM);
export const destroy = createAction(DESTROY);

export default handleActions({
  [SET_FORM]: (state, action) => {
    console.log('@@@@ state: ', state);
    console.log('@@@@ action: ', action);
    return {
      ...state,
      form: {
        ...state.form,
        [action.payload.key]: action.payload.value
      }
    }
  },
  [DESTROY]: (state, action) => initialState
}, initialState);