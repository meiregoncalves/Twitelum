import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Logout from './pages/Logout';

const Trend = (props) => {
    console.log(props);
    return (<h1>Tela do trend: { props.match.params.trendId }</h1>)
}

//const RotaAutenticada = ({path, component, exact}) => {
const RotaProtegida = ({ deveEstarAutenticado=true, redirectTo, ...props}) => {
    const token = localStorage.getItem('token');

    if ((token && deveEstarAutenticado) || (!token && !deveEstarAutenticado) ) {
        return <Route {...props} />
    }

    return <Redirect to={redirectTo} />
}

const Roteamento = () => {
    return (
        <Switch>
            {/* onde? o que? */}
            <RotaProtegida path="/" component={Home} exact redirectTo="/login" />   
            <RotaProtegida deveEstarAutenticado={false} path="/login" component={Login} /> 
            <RotaProtegida path="/trend/:trendId" component={Trend} redirectTo="/login" /> 
            <RotaProtegida path="/logout" component={Logout} />   
            <RotaProtegida path="*" component={NotFound} />                  
        </Switch>
    );
}

export default Roteamento;