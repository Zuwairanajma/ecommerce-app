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
// const rootElement = document.getElementById('root');

// if (rootElement) {
//   console.log('Element with ID "root" exists.');
//   // You can proceed with rendering your React application here
// } else {
//   console.error('Element with ID "root" does not exist.');
// Handle this situation, e.g., display an error message
// }

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
