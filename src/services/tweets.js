export function criaTweet ({ token, conteudo }) {
    return fetch(
        'https://api-twitelum.herokuapp.com/tweets?X-AUTH-TOKEN=' + token,
        {
            method: 'POST',
            body: JSON.stringify({conteudo})
        }
    ).then(response  => response.json())             
}