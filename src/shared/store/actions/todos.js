import { GET_TODOS, UPDATE_TODO, ADD_NEW_TODO } from "../constants";
import environments from "../../../environments";

export const getBucketTodos = bucket_id => {
  return {
    type: GET_TODOS,
    promise: client =>
      client.get(`${environments.URL}/todo/${bucket_id}`)
  };
};

export const updateTodo = payload => {
  return {
    type: UPDATE_TODO,
    data: payload,
    promise: client => client.put(`${environments.URL}/todo`, payload)
  };
};

export const addNewTodo = payload => {
  return {
    type: ADD_NEW_TODO,
    data: payload,
    promise: client => client.post(`${environments.URL}/todo`, payload)
  };
};