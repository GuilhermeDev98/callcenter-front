import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Services/Auth';

import Login from './Pages/Auth/Login'
import Dashboard from './Pages/Dashboard'
import Permissions from './Pages/Dashboard/Permissions';

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
    <BrowserRouter forceRefresh={true}>
        <Switch>
            <Route exact path="/" component={ () => <h1>Hello World</h1> } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoutes path="/app" component={ () => <h1>Você esta logado</h1> } />
            <PrivateRoutes path="/dashboard" exact component={ Dashboard } />
            <PrivateRoutes path="/dashboard/permissions" component={ Permissions } />
        </Switch>
    </BrowserRouter>
);

export default Routes