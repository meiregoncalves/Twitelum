import React from 'react';
import Navegacao from './navegacao'

class Cabecalho extends React.Component {
    render() {
        return (
            <header>
                <h1>Twitelum</h1>

                <Navegacao />
            </header>
        );
    }
}

export default Cabecalho;