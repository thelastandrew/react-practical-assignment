import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './postsReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;