import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(({auth}) => auth)

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch]) 

    console.log(checking)

    if (checking) {
        return <p>...</p>
    }
    return (
        <Router>
            <div>
                <Switch>

                    <PublicRouter isLoggedIn={!!uid} exact path='/login' component={LoginScreen} />
                    <PrivateRouter isLoggedIn={!!uid} exact path='/' component={CalendarScreen} />
                    <Redirect to='/login'/>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
