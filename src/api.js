import * as Config from './config.js';

// METHODS
/**
 * Returns the response's data field or throws an error
 * @param {String} url 
 * @param {*} params 
 * @returns {*}
 */
export const fetchData = async (url, params) => {
    const instance = axios.create({
        httpsAgent: false,
    });

    //console.log("Conectando...");

    try {
        const response = await instance.get(url, {params}).then(response => {
            if(response.status >= 200 && response.status < 300 && response.data){
                //console.log(response);
                return response; // Atribuido ao const response
            }
            else{
                throw error = "Formato de resposta inválido da requisição!";
            }
        });
        return response.data; // Retorno do metodo
    }catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
};

export class Fetcher{
    constructor(endpoint = Config.API_BASE, timeout = 8000){
        this.instance = axios.create({
            baseURL: endpoint,
            timeout: timeout
        });
        this.endpoint = endpoint;
    };

    async useFetch(url, params){
        try {
            const response = await this.instance.get(url, { params }).then(
                response => {
                    if (response.status >= 200 && response.status < 300 && response.data) {
                        return response; // Atribuido ao const response
                    }
                    else if (!response.data) {
                        throw new Error("Formato de resposta inválido da requisição! Reason: data vazio");
                    }
                    else throw new Error("Formato de resposta invalido da requisicao!");
                }
            );
            // Retorno do fetchData
            return response.data;
        }catch(error){
            console.error("Error fetching data. Error = ", error);
            throw error;
        }
    };
};