import { postAPI, commentsAPI } from '../api/api';

const SET_POSTS = 'SET_POSTS';
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FIltERED = 'TOGGLE_IS_FIltERED';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const ADD_POST_PICTURE = 'ADD_POST_PICTURE';
const FILTER_POSTS = 'FILTER_POSTS';
const SET_KEYWORD = 'SET_KEYWORD';

const initialState = {
  posts: [],
  page: 1,
  totalPages: 0,
  isFetching: false,
  isFiltered: false,
  keyword: '',
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
    case TOGGLE_IS_FIltERED: {
      return { ...state, isFiltered: action.payload };
    }
    case SET_KEYWORD: {
      return { ...state, keyword: action.payload };
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
const toggleIsFiltered = (isFiltered) => ({ type: TOGGLE_IS_FIltERED, payload: isFiltered });
export const setKeyword = (keyword) => ({ type: SET_KEYWORD, payload: keyword });

const getPostsMiddleware = (pageNum, isFiltered, keyword) => (dispatch) => {
  if (isFiltered) {
    dispatch(searchPosts(keyword));
  } else {
    postAPI.getPosts(pageNum).then((data) => {
      dispatch(setPosts(data.result));
    });
  }
}

export const getInitPosts = (pageNum) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(toggleIsFiltered(false));
  dispatch(setKeyword(''));
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

export const updatePost = (id, title, likes, dislikes, currentPage, isFiltered, keyword) => (dispatch) => {
  postAPI.updatePost(id, title, likes, dislikes).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage, isFiltered, keyword));
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
      dispatch(toggleIsFiltered(true));
      dispatch(setKeyword(keyword));
      dispatch(filterPosts(data.result));
      dispatch(toggleIsFetching(false));
    } else {
      dispatch(setErrorMsg(data.result));
      dispatch(toggleIsFetching(false));
    }
  });
};

export const createComment = (text, postId, username, currentPage, isFiltered, keyword) => (dispatch) => {
  commentsAPI.createComment(text, postId, username).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage, isFiltered, keyword));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
}

export const updateComment = (id, text, likes, dislikes, currentPage, isFiltered, keyword) => (dispatch) => {
  commentsAPI.updateComment(id, text, likes, dislikes).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage, isFiltered, keyword));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
};

export const deleteComment = (id, currentPage, isFiltered, keyword) => (dispatch) => {
  commentsAPI.deleteComment(id).then((data) => {
    if (data.success) {
      dispatch(getPostsMiddleware(currentPage, isFiltered, keyword));
    } else {
      dispatch(setErrorMsg(data.result));
    }
  });
};

export default postsReducer;

