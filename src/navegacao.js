import React from 'react';

//dumb component 

//export default function Navegacao() {
//export defautl () => () <- return
//export default const Navegacao = () <-return

export default function Navegacao(props) {
    return (
        <nav>
            <ul>
                {props.links.map(link => (
                    <li>
                        <a href="#">{link}</a>
                    </li>
                ))}
                {/* <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Notificações</a>
                </li>
                <li>
                    <a href="#">Mensagens</a>
                </li> */}
            </ul>
        </nav>
    );
}