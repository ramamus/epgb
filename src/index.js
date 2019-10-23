import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'redux-little-router';
import routes from '../src/config/routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App> 
    {routes.map(route => {
            const { path, page } = route;
            return (
              <Fragment
                key={path}
                forRoute={path}
                withConditions={location => {
                  return location.pathname === path;
                }}
              >
                {React.createElement(require(`pages/${page}`).default)}
              </Fragment>
            );
          })}
    </App>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
