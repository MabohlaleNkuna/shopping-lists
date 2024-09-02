import { REQUEST, SUCCESS, FAILURE, CREATE, READ, UPDATE, DELETE } from './crud_types';

const url = 'http://localhost:5000';

// Fetch entities
export const fetchEntities = (entity) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST, actionType: READ, entity });

    try {
      const response = await fetch(`${url}/${entity}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("here q");
      console.log(data);
      dispatch({
        type: SUCCESS,
        actionType: READ,
        entity,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        actionType: READ,
        entity,
        error: error.message
      });
    }
  };
};

// Create entity
export const createEntity = (entity, data) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST, actionType: CREATE, entity });

    try {
      const response = await fetch(`${url}/${entity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Error creating data: ${response.statusText}`);
      }
      const createdData = await response.json();

      dispatch({
        type: SUCCESS,
        actionType: CREATE,
        entity,
        payload: createdData
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        actionType: CREATE,
        entity,
        error: error.message
      });
    }
  };
};

// Update entity
export const updateEntity = (entity, id, data) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST, actionType: UPDATE, entity });

    try {
      const response = await fetch(`${url}/${entity}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      }
      const updatedData = await response.json();

      dispatch({
        type: SUCCESS,
        actionType: UPDATE,
        entity,
        payload: updatedData
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        actionType: UPDATE,
        entity,
        error: error.message
      });
    }
  };
};

// Delete entity
export const deleteEntity = (entity, id) => {
  return async (dispatch) => {
    dispatch({ type: REQUEST, actionType: DELETE, entity });

    try {
      const response = await fetch(`${url}/${entity}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.statusText}`);
      }

      dispatch({
        type: SUCCESS,
        actionType: DELETE,
        entity,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        actionType: DELETE,
        entity,
        error: error.message
      });
    }
  };
};


export const fetchUserEntities = (entity, userId) => async (dispatch) => {
  dispatch({ type: REQUEST, entity });

  try {
    let url = `${url}/${entity}`;
    if (userId) {
      url += `?userId=${userId}`; // Append userId if provided
    }

    const response = await fetch(url);
    const data = await response.json();

    dispatch({ type: SUCCESS, actionType: READ, entity, payload: data });
  } catch (error) {
    dispatch({ type: FAILURE, entity, error: error.message });
  }
};