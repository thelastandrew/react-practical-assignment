const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
  isAuth: false,
  username: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isAuth: true, username: action.payload };
    }
    case LOGOUT: {
      return { ...state, isAuth: false, username: '' };
    }
    default: {
      return state;
    }
  }
};

export const login = username => ({ type: LOGIN, payload: username });
export const logout = () => ({ type: LOGOUT });

export default authReducer;