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

    handleCriaTweet = (evento) => {
        evento.preventDefault();

        this.setState({
            //sprad operation
            listaTweets: [this.state.novoTweet, ...this.state.listaTweets],
            novoTweet: ''
        }, () => console.log(this.state.listaTweets));
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
                                {listaTweets.map((texto, index) => (
                                    <Tweet
                                        key={`${texto}${index}`}
                                        username="@meiregoncalves"
                                        nome="Meire"
                                        qtdelikes="20"
                                        avatarurl="https://static.escolakids.uol.com.br/2019/07/coala.jpg" >
                                        {texto}
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
