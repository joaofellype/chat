import React from 'react'
import { BrowserRouter,Route, Redirect} from 'react-router-dom'
import { IsAuthenticated } from './autentic/autenticLogin'
import Home from './pages/home/home'
import Login from './pages/login/index'
import Signup from './pages/singnup/index'

const PrivateRoute =  ({component:Component,...rest})=>(    
    <Route {...rest} render={props =>(
    
        IsAuthenticated()?(
            <Component {...props} />
        ):(
            <Redirect to={{pathname:'/',state:{from:props.location}}} />
        )
    )
        }
    />
);

const Routes = () =>{

    return(
    <BrowserRouter>
        <Route component={Login} path="/" exact />
        <PrivateRoute path="/home" component={Home} />
        <Route component={Signup} path="/signup" />
        <Route component={Login} path="/login" />

    </BrowserRouter>
    )
}

export default Routes;