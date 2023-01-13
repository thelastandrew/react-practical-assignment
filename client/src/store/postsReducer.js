import { postAPI } from '../api/api';

const SET_POSTS = 'SET_POSTS';
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_TOTAL_POSTS = 'SET_TOTAL_POSTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const ADD_POST = 'ADD_POST';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const REMOVE_POST = 'REMOVE_POST';
const EDIT_POST = 'EDIT_POST';

const initialState = {
  posts: [],
  totalPosts: 0,
  page: 1,
  totalPages: 0,
  isFetching: true,
  errorMsg: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.payload };
    }
    case SET_TOTAL_POSTS: {
      return { ...state, totalPosts: action.payload };
    }
    case SET_PAGE: {
      return { ...state, page: action.payload };
    }
    case SET_TOTAL_PAGES: {
      return { ...state, totalPages: action.payload };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.payload };
    }
    case ADD_POST: {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    case SET_ERROR_MESSAGE: {
      return { ...state, errorMsg: action.payload };
    }
    case REMOVE_POST: {
      return { ...state, posts: state.posts.filter(p => p.id !== action.payload ) };
    }
    case EDIT_POST: {
      const postToUpdate = state.posts.findIndex(p => p.id === action.payload.id);
      state.posts.splice(postToUpdate, 1, action.payload);
      return { ...state, posts: [...state.posts] };
    }
    default: {
      return state;
    }
  }
};

const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });
const setTotalPosts = (totalPosts) => ({
  type: SET_TOTAL_POSTS,
  payload: totalPosts,
});
const setPage = (page) => ({ type: SET_PAGE, payload: page });
const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});
const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  payload: isFetching,
});
const addPost = (newPost) => ({ type: ADD_POST, payload: newPost });
const setErrorMsg = (errorMsg) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMsg,
});
const removePost = (id) => ({ type: REMOVE_POST, payload: id });
const editPost = (updatedPost) => ({ type: EDIT_POST, payload: updatedPost });

export const getPosts = (pageNum) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.getPosts(pageNum).then((data) => {
    if (data.success) {
      dispatch(setPosts(data.result));
      dispatch(setTotalPosts(data.total));
      dispatch(setPage(data.page));
      dispatch(setTotalPages(data.totalPages));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const createPost = (title, username) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.createPost(title, username).then((data) => {
    if (data.success) {
      dispatch(addPost(data.result));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const deletePost = (id) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.deletePost(id).then((data) => {
    if (data.success) {
      dispatch(removePost(data.result.id));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const updatePost = (id, title, likes, dislikes) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.updatePost(id, title, likes, dislikes).then((data) => {
    if(data.success) {
      dispatch(editPost(data.result));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export default postsReducer;
