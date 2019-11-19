import React, { useCallback } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import List from './components/List';
import About from './components/About';
import Burger from './components/Burger';
import HomePage from './components/HomePage';
import { useEventListener, setMouseClickAnimation } from './utils';

import './App.scss';

const App = () => {
    const mouseClickHandler = useCallback(setMouseClickAnimation, []);
    useEventListener('click', mouseClickHandler);

    return (
        <div className='App bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-light'>
                <Link className='navbar-brand' to='/'>Awesome Burgers</Link>
                <div>
                    <Link className='navbar-brand' to='/list'>List</Link>
                    <Link className='navbar-brand' to='/about'>About</Link>
                </div>
            </nav>
            <Switch>
                <Route path='/burger/:burgerId' component={Burger} />
                <Route path='/list' component={List} />
                <Route path='/about' component={About} />
                <Route path='/' component={HomePage} />
            </Switch>
        </div>
    );
};

export default App;
