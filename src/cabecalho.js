import React from 'react';

class Cabecalho extends React.Component {
    render() {
        return (
            <header>
                <h1>Twitelum</h1>

                <nav>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Notificações</a>
                        </li>
                        <li>
                            <a href="#">Mensagens</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Cabecalho;