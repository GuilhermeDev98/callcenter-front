import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Services/Auth';

import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard'
import Roles from './Pages/Dashboard/Role';
import PanelAttendance from './Pages/Dashboard/Attendance';
import Client from './Pages/Dashboard/Client'
import Employee from './Pages/Dashboard/Employee';
import Permissions from './Pages/Dashboard/Permission';


const PrivateRoutes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={ props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={ {pathname: '/login', state: { from: props.location } } } />
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter forceRefresh={false}>
        <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoutes path="/app" component={ () => <h1>Você esta logado</h1> } />
            <PrivateRoutes path="/dashboard" exact component={ Dashboard } />
            <PrivateRoutes path="/dashboard/roles" component={ Roles } />
            <PrivateRoutes path="/dashboard/permissions" component={ Permissions } />
            <PrivateRoutes path="/dashboard/attendance/:userId" component={ PanelAttendance } />
            <PrivateRoutes path="/dashboard/clients" component={ Client } />
            <PrivateRoutes path="/dashboard/employees" component={ Employee } />
        </Switch>
    </BrowserRouter>
);

export default Routes
