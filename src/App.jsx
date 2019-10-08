import React, { useCallback } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import About from './components/About';
import Burger from './components/Burger';
import HomePage from './components/HomePage';
import { unstable_setGlobalCacheLimit } from './cache';
import { useEventListener, setMouseClickAnimation } from './utils';

import './App.scss';

const App = () => {
    unstable_setGlobalCacheLimit(0);

    const mouseClickHandler = useCallback(setMouseClickAnimation, []);
    useEventListener('click', mouseClickHandler);

    return (
        <div className='App bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-light'>
                <Link className='navbar-brand' to='/'>Awesome Burgers</Link>
                <Link className='navbar-brand' to='/about'>About</Link>
            </nav>
            <Switch>
                <Route path='/burger/:burgerId' component={Burger} />
                <Route path='/about' component={About} />
                <Route path='/' component={HomePage} />
            </Switch>
        </div>
    );
};

export default App;
