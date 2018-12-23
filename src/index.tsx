import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { initiateClient } from './api/sheets';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from "./store";
import { setClientLoaded } from './store/actions/clientActions';

dotenv.config();

initiateClient(() => {
  store.dispatch(setClientLoaded(true))
})

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
