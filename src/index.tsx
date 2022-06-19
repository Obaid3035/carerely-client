import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './services/store';
import App from './App';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-quill/dist/quill.snow.css';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';

// axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.baseURL = 'https://careraly-server.herokuapp.com/'



const app = (
   <Provider store={store}>
      <App />
   </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
