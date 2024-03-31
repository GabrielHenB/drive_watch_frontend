//export const API_BASE = "http://localhost:8080/api/v1/"
export const API_BASE = "https://6609d2960f324a9a2883d1bb.mockapi.io/api/v1/"
// ENDPOINTS GET
const register = "register";
const eventos = "event";
const devices = "device";
const company = "company";
//const tem_acesso = "api/temacesso";
//const urli = "api/i/";

// ENDPOINTS POST
//const salvar = "salvar";
//const upload = "upload";

// ENDPOINTS UPDATE
const pessoas_up = "pessoas/up";

export const URL_REGISTER = API_BASE + register;
export const URL_EVENTOS = API_BASE + eventos;
export const URL_PESSOAS_UP = API_BASE + pessoas_up;
//export const URL_ACESSO = API_BASE + tem_acesso;
//export const URL_I = API_BASE + urli;
//export const URL_SALVAR = API_BASE + salvar;
//export const URL_UPLOAD = API_BASE + upload;

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
    console.log("Conectando...");
    try {
        const response = await instance.get(url, {params}).then(response => {
            if(response.status >= 200 && response.status < 300 && response.data){
                //console.log(response);
                return response; // Retorno do const
            }
            else{
                throw error = "Formato de resposta inválido da requisição!";
            }
        });
        return response.data; // Retorno do metodo
    }catch(error){
        console.error('Error fetching data:', error);
        //resposta.value = "Erro: " + error.message;
        //mostrarErro.value = true;
        throw error;
    }
};
