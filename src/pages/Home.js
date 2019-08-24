import React, { Component, Fragment } from 'react';
import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'

import { NotificacaoContext } from './../contexts/notificacao'

class App extends Component {
    state = {
        novoTweet: '',
        listaTweets: []
    }

    handleGetTweets = () => {
        console.log('passei aqui');
        fetch(
            'https://api-twitelum.herokuapp.com/tweets',
            {
                method: 'GET'
            }
        ).then(async (resposta) => {
            console.log(resposta);
        });         
    }

    handleCriaTweet = (evento) => {
        evento.preventDefault();
        const conteudo = this.state.novoTweet;

        fetch(
            'https://api-twitelum.herokuapp.com/tweets?X-AUTH-TOKEN=' + localStorage.getItem('token'),
            {
                method: 'POST',
                body: JSON.stringify({conteudo})
            }
        ).then((resposta) => {     
            resposta.json().then((data) => {
                console.log(data.conteudo);

                this.setState({
                    //sprad operation
                    listaTweets: [data, ...this.state.listaTweets],
                    novoTweet: ''
                }, () => console.log(this.state.listaTweets));                
            });                
        }).catch((err) => {
            console.log("Deu ruim")
        });
    }

    novoTweetEstaValido() {
        const novoTweetLength = this.state.novoTweet.length;

        return novoTweetLength > 0 && novoTweetLength <= 140;
    }

    render() {
        //destructuring
        const { novoTweet, listaTweets } = this.state;

        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.handleCriaTweet} onLoad={this.handleGetTweets}>
                                <div className="novoTweet__editorArea">
                                    <span className={`novoTweet__status ${this.novoTweetEstaValido()
                                        ? '' : 'novoTweet__status--invalido'}`}>
                                        {novoTweet.length}/140
                            </span>
                                    <textarea
                                        className="novoTweet__editor"
                                        placeholder="O que está acontecendo?"
                                        onChange={(evento) => {
                                            //console.log(evento.target.value);
                                            this.setState({
                                                novoTweet: evento.target.value
                                            });
                                        }}
                                        value={novoTweet}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="novoTweet__envia"
                                    disabled={!this.novoTweetEstaValido()}
                                >Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {/* truthy */}
                                {!listaTweets.length && (
                                    <p>Sem tweets</p>
                                )}
                                {listaTweets.map((tweet, index) => (
                                    <Tweet
                                        key={`${tweet}${index}`}
                                        username= { `${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                                        nome={tweet.usuario.login}
                                        qtdelikes={tweet.totalLikes}
                                        avatarurl={tweet.foto} >
                                        {tweet.conteudo}
                                    </Tweet>
                                ))}
                            </div>
                        </Widget>
                    </Dashboard>
                </div>                
            </Fragment>
        );
    }
}

export default App;
