// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './redux/store';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const rootElement = document.getElementById('root');

// Use createRoot to render your application
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
