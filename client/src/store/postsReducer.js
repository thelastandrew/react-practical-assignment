import { postAPI, commentsAPI } from '../api/api';

const SET_POSTS = 'SET_POSTS';
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const ADD_POST_PICTURE = 'ADD_POST_PICTURE';
const FILTER_POSTS = 'FILTER_POSTS';

const initialState = {
  posts: [],
  page: 1,
  totalPages: 0,
  isFetching: false,
  errorMsg: '',
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS: {
      return { ...state, posts: action.payload };
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
    case SET_ERROR_MESSAGE: {
      return { ...state, errorMsg: action.payload };
    }
    case ADD_POST_PICTURE: {
      const postToUpdate = state.posts.findIndex(
        (p) => p.id === action.payload.id
      );
      state.posts.splice(postToUpdate, 1, action.payload);
      return { ...state, posts: [...state.posts] };
    }
    case FILTER_POSTS: {
      return { ...state, posts: action.payload };
    }
    default: {
      return state;
    }
  }
};

const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });
const setPage = (page) => ({ type: SET_PAGE, payload: page });
const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, payload: isFetching });
const setErrorMsg = (errorMsg) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMsg,
});
const addPostPicture = (updatedPost) => ({
  type: ADD_POST_PICTURE,
  payload: updatedPost,
});
const filterPosts = (posts) => ({ type: FILTER_POSTS, payload: posts });

const getPostsMiddleware = (pageNum) => (dispatch) => {
  postAPI.getPosts(pageNum).then((data) => {
    dispatch(setPosts(data.result));
  });
}

export const getInitPosts = (pageNum) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.getPosts(pageNum).then((data) => {
    if (data.success) {
      dispatch(setPosts(data.result));
      dispatch(setPage(data.page));
      dispatch(setTotalPages(data.totalPages));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const createPost = (title, username, formData, currentPage) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.createPost(title, username).then((data) => {
    if (data.success) {
      dispatch(uploadPostPicture(data.result.id, formData));
      dispatch(getInitPosts(currentPage));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const deletePost = (id, currentPage) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.deletePost(id).then((data) => {
    if (data.success) {
      dispatch(getInitPosts(currentPage));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const updatePost = (id, title, likes, dislikes, currentPage) => (dispatch) => {
  postAPI.updatePost(id, title, likes, dislikes).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage));
    } else {
      dispatch(setErrorMsg(data.result));;
    }
  }).catch((e) => {console.log(e)});
};

export const uploadPostPicture = (id, formData) => (dispatch) => {
  postAPI.uploadPostPicture(id, formData).then((data) => {
    if (data.success) {
      dispatch(addPostPicture(data.result));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
};

export const searchPosts = (keyword) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  postAPI.filterPosts(keyword).then((data) => {
    if (data.success) {
      dispatch(filterPosts(data.result));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const createComment = (text, postId, username, currentPage) => (dispatch) => {
  commentsAPI.createComment(text, postId, username).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
}

export const updateComment = (id, text, likes, dislikes, currentPage) => (dispatch) => {
  commentsAPI.updateComment(id, text, likes, dislikes).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
};

export const deleteComment = (id, currentPage) => (dispatch) => {
  commentsAPI.deleteComment(id).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
};

export default postsReducer;

