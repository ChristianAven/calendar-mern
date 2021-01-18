import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

const PublicRouter = ({ isLoggedIn, component:Component, ...rest }) => {
    return (
        <Route {...rest} 
            component={
                (props) => (
                    (isLoggedIn) 
                    ? (<Redirect to='/'/>)
                    : (<Component {...props}/>)
                            
                )} 
        />
    ) 
}
PublicRouter.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired
}


export default PublicRouter