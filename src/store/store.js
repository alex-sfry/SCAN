import { legacy_createStore as createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from './reducers/loginReducer.js';
import queryReducer from './reducers/queryReducer.js';
import resultReducer from './reducers/resultReducer.js';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({login: loginReducer, query: queryReducer, result: resultReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store)


//export default store;