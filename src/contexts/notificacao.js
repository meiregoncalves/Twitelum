import React, { Component, createContext, useState } from 'react';

export const NotificacaoContext = createContext({
    mensagem: '',
    setMensagem() { }
});

export const NotificacaoProvider = (props) => {
    const [mensagem, setMensagem] = useState('');

    return (
        <NotificacaoContext.Provider
            value={{
                mensagem,
                setMensagem
            }}>
            {props.children}
            {mensagem && (
                <div className="notificacaoMsg" onAnimationEnd={() => setMensagem('')}>
                    {mensagem}
                </div>
            )}
        </NotificacaoContext.Provider>
    );
};