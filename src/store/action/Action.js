export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const GET_NEXT_USERS_BATCH = "GET_NEXT_USERS_BATCH";
export const GET_NEXT_USERS_BATCH_SUCCESS = "GET_NEXT_USERS_BATCH_SUCCESS";
export const GET_NEXT_USERS_BATCH_FAILURE = "GET_NEXT_USERS_BATCH_FAILURE";
export const ADD_NEXT_USERS_BATCH = "ADD_NEXT_USERS_BATCH";

/**
 * Get Users.
 *
 * @returns {Object} action.
 */
export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

/**
 *  Users successfully received.
 *
 * @param {Object} users.
 * @returns {Object} action.
 */
export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
};

/**
 * Failed to get users.
 *
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getUsersFailure = (errors) => {
  return {
    type: GET_USERS_FAILURE,
    errors
  };
};

/**
 * Get Next Users batch.
 *
 * @returns {Object} action.
 */
export const getNextUsersBatch = () => {
  return {
    type: GET_NEXT_USERS_BATCH
  };
};

/**
 *  Next batch of Users successfully received.
 *
 * @param {Object} users.
 * @returns {Object} action.
 */
export const getNextUsersBatchSuccess = (users) => {
  return {
    type: GET_NEXT_USERS_BATCH_SUCCESS,
    users
  };
};

/**
 * Failed to get next users batch.
 *
 * @param {Object} errors.
 * @returns {Object} action.
 */
export const getNextUsersBatchFailure = (errors) => {
  return {
    type: GET_NEXT_USERS_BATCH_FAILURE,
    errors
  };
};

/**
 * Add next items batch to items state.
 *
 * @returns {Object} action.
 */
export const addNextUsersBatch = () => {
  return {
    type: ADD_NEXT_USERS_BATCH
  };
};
