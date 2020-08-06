import { GET_POST, GET_POSTS, POST_LOADING, GET_USER_POSTS, CLEAR_POST, CLEAR_POSTS, GET_TAG_POSTS } from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  userPosts: null,
  loadingPost: false,
  tagPosts: null,
};

export default function (state=initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loadingPost: true,
      };
    case GET_TAG_POSTS:
      return {
        ...state,
        tagPosts: action.payload,
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPost: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loadingPost: false,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        loadingPost: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: {}
      }
    case CLEAR_POSTS: 
      return {
        ...state,
        posts: []
      }
    // case GET_OTHER_USERS_POSTS:
    //   return {
    //     ...state,
    //     othersUserPosts: action.payload,
    //     loadingPost: false,
      // };
    default:
      return state;
  }
}