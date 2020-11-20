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
  SORT_TODOS,
  SORT_COMPLETE,
  SORT_NOT_COMPLETE,
  SEARCH_TODOS
} from "../actions/types";
import { todosApi } from "../api/todosApi";

export const setLoading = () => {
  return { type: SET_LOADING };
};
export const stopLoading = () => {
  return { type: STOP_LOADING };
};
export const getTodos = () => async dispatch => {
  try {
    dispatch(setLoading());
    let data = await todosApi.getAll();
    dispatch({ type: FETCH_TODOS, payload: data });
  } catch (err) {
    dispatch({ type: TODOS_ERROR, payload: "error" });
  } finally {
    dispatch(stopLoading());
  }
};
export const addTodo = todo => async dispatch => {
  try {
    dispatch(setLoading());
    let data = await todosApi.post(todo);
    dispatch({ type: ADD_TODO, payload: data });
  } catch (err) {
    dispatch({ type: TODOS_ERROR, payload: "error" });
  } finally {
    dispatch(stopLoading());
  }
};
export const setEdit = todo => ({ type: SET_EDIT, payload: todo });

//note
export const saveTodo = (current, input) => async dispatch => {
  try {
    dispatch(setLoading());
    let editTodo = { ...current, isEdited: false, name: input };
    let data = await todosApi.put(current.id, editTodo);
    dispatch({ type: SAVE_TODO, payload: { id: data.id, editTodo } });
  } catch (err) {
    dispatch({ type: TODOS_ERROR, payload: "error" });
  } finally {
    dispatch(stopLoading());
  }
};

export const deleteTodo = id => async dispatch => {
  try {
    dispatch(setLoading());
    let data = await todosApi.delete(id);
    dispatch({ type: DELETE_TODO, payload: data.id });
  } catch (err) {
    dispatch({ type: TODOS_ERROR, payload: "error" });
  } finally {
    dispatch(stopLoading());
  }
};

//cach 1
// export const setComplete = newTodo => async dispatch => {
//   try {
//     dispatch(setLoading());
//     let data = await todosApi.put(newTodo.id, newTodo);
//     dispatch({ type: SET_COMPLETE, payload: data });
//   } catch (err) {
//     dispatch({ type: TODOS_ERROR, payload: "error" });
//   } finally {
//     dispatch(stopLoading());
//   }
// };

//cach 2
export const setComplete = (todo, checked) => async dispatch => {
  try {
    dispatch(setLoading);
    let newTodo = { ...todo, completed: checked };
    let data = await todosApi.put(todo.id, newTodo);
    dispatch({ type: SET_COMPLETE, payload: data });
  } catch (err) {
    dispatch({ type: TODOS_ERROR, payload: "error" });
  } finally {
    dispatch(stopLoading());
  }
};
export const setTotalList = () => {
  return { type: SET_TOTAL_LIST };
};
export const sortTodos = todos => {
  const list = todos.sort((a, b) => {
    let newDateA = new Date(a.date);
    let newDateB = new Date(b.date);
    return newDateB - newDateA;
  });
  const list1 = list.filter(x => !x.completed);
  const list2 = list.filter(x => x.completed);
  const result = list1.concat(list2);
  return { type: SORT_TODOS, payload: result };
};
export const sortComplete = () => {
  return { type: SORT_COMPLETE };
};
export const sortNotComplete = () => {
  return { type: SORT_NOT_COMPLETE };
};
export const searchTodo = input => {
  return { type: SEARCH_TODOS, payload: input };
};
