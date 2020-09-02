import { GET_BUCKETS, ADD_NEW_BUCKET } from "../constants";
const initialState = {
  loading: false,
  loaded: false,
  buckets: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_BUCKETS}_REQUEST`: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case GET_BUCKETS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        buckets: action.payload
      };
    }

    case ADD_NEW_BUCKET: {
      return {
        ...state,
        buckets: {
          ...state.buckets,
          data: [
            ...state.buckets.data,
            {
              bucket_id: state.buckets.data.length + 1,
              bucket_name: action.data.bucket_name
            }
          ]
        }
      };
    }
    default:
      return { ...state };
  }
};
