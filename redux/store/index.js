import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import reduxReset from 'redux-reset';
// import thunk from 'redux-thunk'
// const loggerMiddleware = createLogger();
const persistedState = {};
//  persistedState = AsyncStorage.getItem('localStorageState');

export const store = createStore(
    rootReducer,
    persistedState,
);

store.subscribe(() => {
    // AsyncStorage.setItem('localStorageState', store.getState())
}
);

