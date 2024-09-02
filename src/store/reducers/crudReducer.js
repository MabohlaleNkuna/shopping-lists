import { REQUEST, SUCCESS, FAILURE, CREATE, READ, UPDATE, DELETE } from '../../actions/crud_types';

const initialState = {
    data: [],
    loading: false,
    error: null,
  };
  
// Generic CRUD Reducer
const crudReducer = (state = initialState, action) => {
  const { type, actionType, entity, payload, error } = action;

  switch (type) {
    case REQUEST:
      return {
        ...state,
        [entity]: {
          ...state[entity],
          loading: true,
          error: null,
        },
      };

    case SUCCESS:
      switch (actionType) {
        case READ:
          return {
            ...state,
            [entity]: {
              ...state[entity],
              loading: false,
              data: payload,
              error: null,
            },
          };

        case CREATE:
          return {
            ...state,
            [entity]: {
              ...state[entity],
              loading: false,
              data: [...(state[entity]?.data || []), payload],
              error: null,
            },
          };

        case UPDATE:
          return {
            ...state,
            [entity]: {
              ...state[entity],
              loading: false,
              data: state[entity]?.data.map(item =>
                item.id === payload.id ? payload : item
              ),
              error: null,
            },
          };

        case DELETE:
          return {
            ...state,
            [entity]: {
              ...state[entity],
              loading: false,
              data: state[entity]?.data.filter(item => item.id !== payload),
              error: null,
            },
          };

        default:
          return state;
      }

    case FAILURE:
      return {
        ...state,
        [entity]: {
          ...state[entity],
          loading: false,
          error: error,
        },
      };

    default:
      return state;
  }
};

export default crudReducer;
