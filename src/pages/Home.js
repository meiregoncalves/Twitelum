import React, { Component, Fragment } from 'react';
import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'
import * as tweetService from '../services/tweets'

import { NotificacaoContext } from './../contexts/notificacao'

class App extends Component {
    state = {
        novoTweet: '',
        listaTweets: []
    }

    componentDidMount() { //apos construction e render (apenas na primeira renderização)
        const token = localStorage.getItem('token');
        tweetService.listaTweets(token)
        .then((listadeTweets) => {
            this.setState({
                listaTweets: listadeTweets
            })
        });
    }

    componentDidUpdate (){ } //apos atualização do componente (mudança de estado)

    componentWillUnmount() { } //antes de o componente ser desmontado

    handleCriaTweet = (evento) => {
        evento.preventDefault();
        const conteudo = this.state.novoTweet;
        const token = localStorage.getItem('token');

        tweetService.criaTweet( { 
            token,  
            conteudo 
        })
        .then((tweetcriado) => {
            this.setState({
                //sprad operation
                listaTweets: [tweetcriado, ...this.state.listaTweets],
                novoTweet: ''
            }, () => console.log(this.state.listaTweets));  
        }).catch((err) => {
            console.log("Deu ruim")
        });
    }

    onDeleteTweet = (tweetId) => {
        const { listaTweets } = this.state;

        this.setState({
            listaTweets: listaTweets
            .filter((tweet) => tweet._id !== tweetId)
        })
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
                            <form className="novoTweet" onSubmit={this.handleCriaTweet}>
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
                                        key={tweet._id}
                                        id={tweet._id}
                                        username= { `${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                                        nome={tweet.usuario.login}
                                        totalLikes={tweet.totalLikes}
                                        removivel={tweet.removivel}
                                        likeado={tweet.likeado}
                                        avatarurl={tweet.usuario.foto}
                                        onDelete={this.onDeleteTweet}
                                    >
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
