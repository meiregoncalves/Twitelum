import * as TweetsService from '../services/tweets';

export const actionTypes = {
    atualizaLista: 'tweets/atualizaLista',
    novo: 'tweets/novoTweet',
    delete: 'tweets/apaga'
};


export const actions = {
    listaTweets () {
    return dispatch => TweetsService
        .listaTweets()
        .then((listaDeTweets) => {
        dispatch({
            type: actionTypes.atualizaLista,
            listaDeTweets
        });
        });
    },

    criaTweet (conteudo) {
    return dispatch => TweetsService
        .criaTweet(conteudo)
        .then((tweetCriado) => {
        dispatch({
            type: actionTypes.novo,
            tweetCriado
        });
        });
    },

    deletaTweet (tweetId) {
    return dispatch => TweetsService
        .deleteTweet({ tweetId })
        .then(() => {
        dispatch({
            type: actionTypes.delete,
            tweetId
        });
        })
    }
}

export const stateInicial = {
    lista: [],
    tweetSelecionado: ''
  };

export const reduceHandler = {
    [actionTypes.atualizaLista] : (store, {listaDeTweets}) => {
        return {
            ...store,
            lista: listaDeTweets
        };
    },

    [actionTypes.novo] : (store, {tweetCriado}) => {
        return {
            ...store,
            lista: [tweetCriado, ...store.lista]
          };
    },  
    
    [actionTypes.delete] : (store, {tweetId}) => {
        return {
            ...store,
            lista: store.lista
              .filter(tweet => tweet._id !== tweetId)
        };
    }
}
