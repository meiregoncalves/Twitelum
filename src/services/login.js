export function logar(login, senha) {
        //IE 6 -> axios
        return fetch(
            'https://api-twitelum.herokuapp.com/login',
            {
                method: 'POST',
                body: JSON.stringify( { login, senha } )
            }
        ).then(async (resposta) => {
            //console.log(resposta);

            //if (!resposta.ok) throw new Error();

            const data =  await resposta.json()

            return { 
                data,
                respostaOk: resposta.ok
            };
        });
}