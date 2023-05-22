import { legacy_createStore as createStore } from 'redux';
import loginReducer from './reducers/loginReducer';

const store = createStore(loginReducer);
console.log('store', store.getState())

export default store;