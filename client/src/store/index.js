import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './postsReducer';;

const reducers = combineReducers({
  posts: postsReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));
window.store = store;

export default store;