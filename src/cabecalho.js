import React from 'react';

class Cabecalho extends React.Component {
    render() {
        return (
            <header>
                <h1>Twitelum</h1>

                {this.props.children}
            </header>
        );
    }
}

export default Cabecalho;