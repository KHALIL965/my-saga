import * as actions from "../action/Action";
import { BATCH_SIZE, MAX_CATALOGUE_LENGTH } from "../../Constants";

/**
 * Check if number of items exceeds the desired end of catalogue.
 *
 * @param {number} currentPage.
 * @param {number} batchSize.
 * @param {number} maxCatalogueLength.
 * @returns {boolean}
 */
export function checkEndOfCatalogue(
  currentPage,
  batchSize,
  maxCatalogueLength
) {
  return batchSize * currentPage > maxCatalogueLength;
}

const initialState = {
  isFetching: true,
  hasErrored: false,
  isEndOfCatalogue: false,
  items: [],
  nextItemsBatch: [],
  currentPage: 1
};

/**
 * Get users.
 *
 * @param {Object} state.
 * @param {Object} action.
 * @returns {Object} a copy of the state modified according to the action dispatched.
 */
const users = (state = initialState, action) => {
  const isEndOfCatalogue = checkEndOfCatalogue(
    BATCH_SIZE,
    state.currentPage,
    MAX_CATALOGUE_LENGTH
  );
  switch (action.type) {
    case actions.GET_USERS:
      return {
        ...state,
        isFetching: true,
        hasErrored: false
      };
    case actions.GET_USERS_SUCCESS:
      if (isEndOfCatalogue) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false,
          isEndOfCatalogue: true
        };
      }
      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        isEndOfCatalogue: false,
        items: [...state.items, ...action.users.results],
        currentPage: state.currentPage + 1
      };
    case actions.GET_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true
      };
    case actions.GET_NEXT_USERS_BATCH_SUCCESS:
      if (isEndOfCatalogue) {
        return {
          ...state,
          isFetching: false,
          hasErrored: false,
          isEndOfCatalogue: true
        };
      }

      return {
        ...state,
        isFetching: false,
        hasErrored: false,
        nextItemsBatch: action.users.results,
        currentPage: state.currentPage + 1
      };
    case actions.GET_NEXT_USERS_BATCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasErrored: true
      };
    case actions.ADD_NEXT_USERS_BATCH:
      return {
        ...state,
        items: [...state.items, ...state.nextItemsBatch],
        nextItemsBatch: []
      };
    default:
      return state;
  }
};

export default users;
