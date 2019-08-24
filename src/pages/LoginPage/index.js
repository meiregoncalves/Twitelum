import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import If from '../../components/if'

import './loginPage.css'

class LoginPage extends Component {
    state = {
        errormessage: ''
    }
    
    handlelogin = (evento) => {
        evento.preventDefault();

        const login = this.refs.login.value;
        const senha = this.refs.senha.value;

        //IE 6 -> axios
        fetch(
            'https://twitelum-api.herokuapp.com/login',
            {
                method: 'POST',
                body: JSON.stringify( { login, senha } )
            }
        ).then(async (resposta) => {
            //console.log(resposta);

            //if (!resposta.ok) throw new Error();

            return {
                success: resposta.ok,
                data: await resposta.json()
            }
        }).then(objresposta => {
            //console.log('body vindo da resposta.json(): ', data);

            if (objresposta.success) {
                localStorage.setItem('token', objresposta.data.token);
                this.props.history.push('/');
            }
            else {
                //console.log(objresposta.data);
                this.setState({
                    errormessage: objresposta.data.message
                });
            }
        }).catch(err => console.log(err));
    }

    render() {
        console.log(this.props.history);
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/" onSubmit={this.handlelogin}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input ref="login" className="loginPage__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input ref="senha" className="loginPage__input" type="password" id="senha" name="senha"/>
                                </div>
                                {/* { this.state.errormessage &&
                                    <div className="loginPage__errorBox" ref="mensagemerro">
                                        {this.state.errormessage}
                                    </div> 
                                } */}
                                <If cond={this.state.errormessage}>
                                    <div className="loginPage__errorBox" ref="mensagemerro">
                                        {this.state.errormessage}
                                    </div> 
                                </If>
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage