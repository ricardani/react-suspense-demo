import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './AppWithDebugger';
import * as serviceWorker from './serviceWorker';

import './index.scss';

ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <Router basename={'/'}>
        <App />
    </Router>
);

serviceWorker.unregister();
