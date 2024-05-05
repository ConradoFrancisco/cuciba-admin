import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import 'helpers/initFA';
import MyApp from 'MyApp/MyApp';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <Main>
      <MyApp />
      <ToastContainer />
    </Main>
  </React.StrictMode>,
  document.getElementById('main')
);
