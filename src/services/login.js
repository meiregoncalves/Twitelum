import config from '../config'

export function logar(login, senha) {
        //IE 6 -> axios
        return fetch(
            `${config.api}/login`,
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