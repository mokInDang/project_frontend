import { createStore } from 'redux';
import userInfoReducer from './userSlice'
const store = createStore(userInfoReducer);

export default store;
