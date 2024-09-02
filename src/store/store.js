import { createStore } from 'redux';
import rootReducer from './reducers/index'; // Import your root reducer

const store = createStore(rootReducer);

export default store;

