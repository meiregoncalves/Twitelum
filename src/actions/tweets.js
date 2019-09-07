import * as TweetsService from '../services/tweets';

export function listaTweets () {
  const token = localStorage.getItem('token');

  return dispatch => TweetsService
    .listaTweets(token)
    .then((listaDeTweets) => {
      dispatch({
        type: 'tweets/atualizaLista',
        listaDeTweets
      });
    });
}

