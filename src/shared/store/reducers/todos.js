import { GET_TODOS, UPDATE_TODO, ADD_NEW_TODO } from "../constants";
const initialState = {
  loading: false,
  loaded: false,
  todos: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TODOS}_REQUEST`: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_TODOS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        todos: action.payload
      };
    }

    case UPDATE_TODO: {
      return {
        ...state,
        todos: {
          ...state.todos,
          data: state.todos.data.map(todo => {
            if (todo.todo_id === action.data.todo_id) {
              return { ...todo, status: action.data.status };
            } else {
              return { ...todo };
            }
          })
        }
      };
    }

    case ADD_NEW_TODO: {
      return {
        ...state,
        todos: {
          ...state.todos,
          data: [
            ...state.todos.data,
            { title: action.data.title, status: "inprogress" }
          ]
        }
      };
    }
    default:
      return state;
  }
};
