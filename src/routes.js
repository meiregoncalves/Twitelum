import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/LoginPage';
import NotFound from './pages/NotFound';

const Trend = (props) => {
    console.log(props);
    return (<h1>Tela do trend: { props.match.params.trendId }</h1>)
}

const Roteamento = () => {
    return (
        <Switch>
            {/* onde? o que? */}
            <Route path="/" component={Home} exact />   
            <Route path="/login" component={Login} /> 
            <Route path="/trend/:trendId" component={Trend} /> 
            <Route path="*" component={NotFound} />          
        </Switch>
    );
}

export default Roteamento;