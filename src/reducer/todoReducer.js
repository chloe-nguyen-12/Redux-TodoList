import {
  FETCH_TODOS,
  SET_LOADING,
  STOP_LOADING,
  TODOS_ERROR,
  ADD_TODO,
  SET_EDIT,
  SAVE_TODO,
  DELETE_TODO,
  SET_COMPLETE,
  SET_TOTAL_LIST,
  SORT_COMPLETE,
  SORT_NOT_COMPLETE,
  SORT_TODOS,
  SEARCH_TODOS
} from "../actions/types";
const initialState = {
  todos: [],
  todosTotal: [],
  loading: false,
  error: null,
  current: null
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case FETCH_TODOS:
      return {
        ...state,
        todos: [...payload],
        todosTotal: [...payload]
      };
    case TODOS_ERROR:
      return {
        ...state,
        error: payload
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
        todosTotal: [...state.todos, payload]
      };
    case SET_EDIT:
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === payload.id ? { ...t, isEdited: true } : t
        ),
        current: payload
      };
    // case SET_CURRENT:
    //   return {
    //     ...state,
    //     current: payload
    //   };
    case SAVE_TODO:
      return {
        ...state,
        todos: state.todos.map(x =>
          x.id === payload.id ? payload.editTodo : x
        ),
        todosTotal: state.todosTotal.map(x =>
          x.id === payload.id ? payload.editTodo : x
        ),
        current: null
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(x => x.id !== payload),
        todosTotal: state.todosTotal.filter(x => x.id !== payload)
      };
    case SET_COMPLETE:
      return {
        ...state,
        todos: state.todos.map(x => (x.id === payload.id ? payload : x)),
        todosTotal: state.todosTotal.map(x =>
          x.id === payload.id ? payload : x
        )
      };
    case SET_TOTAL_LIST:
      return {
        ...state,
        todos: [...state.todosTotal]
      };
    case SORT_TODOS:
      return {
        ...state,
        todos: [...payload]
      };
    case SORT_COMPLETE:
      return {
        ...state,
        todos: state.todosTotal.filter(x => x.completed)
      };
    case SORT_NOT_COMPLETE:
      return {
        ...state,
        todos: state.todosTotal.filter(x => !x.completed)
      };
    case SEARCH_TODOS:
      return {
        ...state,
        todos: state.todosTotal.filter(x =>
          x.name.toLowerCase().includes(payload.toLowerCase())
        )
      };
    default:
      return state;
  }
};
