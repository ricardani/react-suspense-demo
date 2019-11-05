import React, { useCallback } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Spinner from './components/Spinner';
import { slowImport } from './api';
import { unstable_setGlobalCacheLimit } from './cache';
import { useEventListener, setMouseClickAnimation } from './utils';

import './App.scss';

const About = React.lazy(() => slowImport(import(/* webpackChunkName: 'About' */ './components/About')));
const Burger = React.lazy(() => slowImport(import(/* webpackChunkName: 'Burger' */ './components/Burger')));
const HomePage = React.lazy(() => slowImport(import(/* webpackChunkName: 'HomePage' */ './components/HomePage')));

function App() {
    unstable_setGlobalCacheLimit(0);

    const mouseClickHandler = useCallback(setMouseClickAnimation, []);
    useEventListener('click', mouseClickHandler);

    return (
        <div className='App bg-dark'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-light'>
                <Link className='navbar-brand' to='/'>Awesome Burgers</Link>
                <Link className='navbar-brand' to='/about'>About</Link>
            </nav>
            <React.Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path='/burger/:burgerId' component={Burger} />
                    <Route path='/about' component={About} />
                    <Route path='/' component={HomePage} />
                </Switch>
            </React.Suspense>
        </div>
    );
}

export default App;
