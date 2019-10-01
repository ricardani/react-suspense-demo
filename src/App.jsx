import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import Burger from './components/Burger';
import { unstable_setGlobalCacheLimit } from './cache';

import './App.scss';

function App() {
    unstable_setGlobalCacheLimit(0);

    return (
        <div className='App bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-light'>
                <Link className='navbar-brand' to='/'>Awesome Burgers</Link>
            </nav>
            <Switch>
                <Route path='/burger/:burgerId' component={Burger} />
                <Route path='/' component={HomePage} />
            </Switch>
        </div>
    );
}

export default App;
