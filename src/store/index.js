import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerForBrowser } from 'redux-little-router';
import reducers, { rootSaga } from '../ducks';
import { composeWithDevTools } from 'redux-devtools-extension';
import localRoutes from '../config/routes';
import sort from './sort';

// create the saga and router middlewares

const sagaMiddleware = createSagaMiddleware();

// reshape the routes into redux-little-router object
const routes = localRoutes.reduce((paths, route) => {
  const { path, title } = route;
  return { ...paths, [path]: { title } };
}, {});

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer
} = routerForBrowser({ routes });

const middlewares = [sagaMiddleware, routerMiddleware];

const allReducers = {
  ...reducers,
  router: routerReducer
};

const store = createStore(
  combineReducers(allReducers),
  { sort },
  composeWithDevTools(enhancer, applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
