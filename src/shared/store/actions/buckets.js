
import { GET_BUCKETS, ADD_NEW_BUCKET } from "../constants";

import environments from "../../../environments";
export const getBuckets = () => {
  return {
    type: GET_BUCKETS,
    promise: client => client.get(`${environments.URL}/bucket`)
  };
};

export const addNewBucket = payload => {
  return {
    type: ADD_NEW_BUCKET,
    data: payload,
    promise: client => client.post(`${environments.URL}/bucket`, payload)
  };
};

export const editBucket = payload => {
  return {
    type: ADD_NEW_BUCKET,
    data: payload,
    promise: client => client.put(`${environments.URL}/bucket`, payload)
  };
};

export const deleteBucket = payload => {
  return {
    type: ADD_NEW_BUCKET,
    data: payload,
    promise: client => client.delete(`${environments.URL}/bucket`, payload)
  };
};