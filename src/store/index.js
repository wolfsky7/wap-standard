import { createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import cookieEnhancer from './middleware/cookie'
import api from './middleware/api'
import nav from './middleware/nav'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import Storage from '../libs/tools/storage.js'
import reducers from './reducers'

// ssr 
// server 不需要 persist

let makeStore;

if (process.browser) {
    let store = null;


    makeStore = (preloadedState) => {
        if (store) return store;

        const persistConfig = {
            key: 'root',
            storage: new Storage(),
            whitelist: ['user'],
            transforms: [
                createTransform(
                    (state, key) => {
                        if (state.toJS) {
                            let rs = state.toJS();
                            rs.__ = true;
                            return rs;
                        }
                        return state;
                    }, // 存
                    (state, key) => {
                        console.log(state)
                        if (state.__) {
                            return Immutable.fromJS(state);
                        }
                        return state;
                    } // 恢复
                )
            ]
        }

        const persistedReducer = persistReducer(persistConfig, reducers)


        store = createStore(
            persistedReducer,
            preloadedState,
            applyMiddleware(thunk, nav, api, cookieEnhancer(['ssr']),
                createLogger({
                    duration: true,
                    predicate: (getState, action) => false,
                    // 打印immutablejs的state
                    stateTransformer: (state) => {
                        const result = {};
                        Object.keys(state).forEach((key) => {
                            if (state[key].toJS) {
                                result[key] = state[key].toJS();
                            } else {
                                result[key] = state[key];
                            }
                        });
                        return result;
                    },
                }))
        );
        persistStore(store);

        return store;
    }
}
else {
    // server 需要每次都创建
    makeStore = (preloadedState) => {
        const store = createStore(
            reducers,
            preloadedState,
            applyMiddleware(thunk, api)
        );

        return store;
    }
}



export default makeStore;