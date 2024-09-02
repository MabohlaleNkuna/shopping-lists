import { createSelector } from 'reselect';


const createEntitySelectors = (entity) => {
  const getEntityData = (state) => state.crud[entity]?.data || [];
  const getEntityLoading = (state) => state.crud[entity]?.loading || false;
  const getEntityError = (state) => state.crud[entity]?.error || null;

  return {
    selectEntityData: createSelector([getEntityData], (data) => data),
    selectEntityLoading: createSelector([getEntityLoading], (loading) => loading),
    selectEntityError: createSelector([getEntityError], (error) => error),
  };
};

// Example usage for 'products'
export const productSelectors = createEntitySelectors('products');
// Add more entities as needed
// export const anotherEntitySelectors = createEntitySelectors('anotherEntity');
