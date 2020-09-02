export default client => () => next => action => {
  const { promise, type, ...rest } = action;

  //for syncronous calls
  if (!promise) {
    return next(action);
  }

  //for async calls
  const SUCCESS = type;
  const REQUEST = `${type}_REQUEST`;
  const FAILURE = `${type}_FAILURE`;
  next({ ...rest, type: REQUEST });

  return promise(client)
    .then(res => next({ ...rest, payload: res.data, type: SUCCESS }))
    .catch(err => next({ ...rest, err, type: FAILURE }));
};
