import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        // filter through, for each post return all except the one that matches payload
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // map through posts, for each post check to see if it is the correct one, if it does then return what is in the post with the likes as the likes that are returned, whether add like or remove like.
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {...state.post, comments: payload},
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          // go through all comments bring back all except the one that matches payload
          comments: state.post.comments.filter(comment => comment._id !== payload)
        },
        loading: false
      }
    default:
      return state;
  }
}
