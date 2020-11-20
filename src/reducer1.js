import { todosApi } from "./api/todosApi";
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH": {
      console.log(action.payload);
      return {
        ...state,
        todos: action.payload,
        todosTotal: action.payload,
        loading: false
      };
    }

    case "ADD": {
      let newTodo = {
        name: action.payload,
        id: Math.random(),
        isEdited: false,
        completed: false,
        date: new Date()
      };
      todosApi.post(newTodo);
      return {
        ...state,
        todos: [newTodo, ...state.todos],
        todosTotal: [newTodo, ...state.todosTotal]
      };
    }

    case "SAVE":
      return {
        ...state,
        todos: state.todos.map(x => {
          if (x.isEdited) {
            let editTodo = {
              ...x,
              name: action.payload,
              isEdited: false
            };
            todosApi.put(`/${x.id}`, editTodo);
            return editTodo;
          }
          return x;
        }),
        todosTotal: state.todosTotal.map(x => {
          if (x.isEdited)
            return { ...x, name: action.payload, isEdited: false };
          return x;
        })
      };

    case "EDIT":
      return {
        ...state,
        todos: state.todos.map(x => {
          if (x.id === action.payload.id) {
            return { ...x, isEdited: true };
          }
          return x;
        })
      };
    case "DELETE": {
      todosApi.delete(action.payload);
      return {
        ...state,
        todos: state.todos.filter(x => x.id !== action.payload),
        todosTotal: state.todosTotal.filter(x => x.id !== action.payload)
      };
    }
    case "COMPLETE":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.name === action.payload.value) {
            if (action.payload.isChecked) {
              todosApi.put(todo.id, { completed: true });
              return { ...todo, completed: true };
            } else {
              todosApi.put(todo.id, { completed: false });
              return { ...todo, completed: false };
            }
          }
          return todo;
        }),
        todosTotal: state.todosTotal.map(todo => {
          if (todo.name === action.payload.value) {
            if (action.payload.isChecked) return { ...todo, completed: true };
            else {
              return { ...todo, completed: false };
            }
          }
          return todo;
        })
      };
    case "SORT": {
      const sortList = state.todos.sort((a, b) => {
        let newDateA = new Date(a.date);
        let newDateB = new Date(b.date);
        return newDateB - newDateA;
      });
      const list1 = sortList.filter(x => !x.completed);
      const list2 = sortList.filter(x => x.completed);
      const result = list1.concat(list2);
      return {
        ...state,
        todos: result
      };
    }
    case "SORT_COMPLETE": {
      return {
        ...state,
        todos: state.todosTotal.filter(x => x.completed)
      };
    }
    case "SORT_NOT_COMPLETE": {
      return {
        ...state,
        todos: state.todosTotal.filter(x => !x.completed)
      };
    }
    case "TOTAL_LIST": {
      return {
        ...state,
        todos: [...state.todosTotal]
      };
    }
    case "SEARCH": {
      return {
        ...state,
        todos: state.todosTotal.filter(x =>
          x.name.toLowerCase().includes(action.payload.toLowerCase())
        )
      };
    }
    default:
      return state;
  }
};
