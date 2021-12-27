import { render } from 'react-dom';
import React from 'react';
import App from '../client/components/App'
import {Provider} from 'react-redux'
import store from '../store/store'

render(<Provider store={store}>
<App />
</Provider>
, document.querySelector('#root'));

