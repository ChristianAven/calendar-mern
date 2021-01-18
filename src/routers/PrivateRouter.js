import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

const PrivateRouter = ({ isLoggedIn, component:Component, ...rest }) => {
    return (
        <Route {...rest} 
            component={
                (props) => (
                    (isLoggedIn) 
                    ? (<Component {...props}/>)
                    : (<Redirect to='/login'/>)
                            
                )}
        /> 
    )
}
PrivateRouter.protoTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired
}


export default PrivateRouter