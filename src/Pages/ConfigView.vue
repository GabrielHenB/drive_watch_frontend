<script setup>
import { URL_COMPANY } from '../config';
import { reactive } from 'vue';

const mock = reactive({
        name: '',
        email: '',
        contract: ''
});

const mockupBackend = async (url, params = '') => {
    const instance = axios.create({
        httpsAgent: false,
        timeout: 4000
    });

    let example = {name: mock.name, email: mock.email, contract: mock.contract};

    try {
        const response = await instance.post(url, example).then(response => {
            if(response.status >= 200 && response.status < 300 && response.data){
                //console.log(response);
                return response; // Atribuido ao const response
            }
            else{
                throw error = "Formato de resposta inválido da requisição!";
            }
        });
        console.log(response.data); // Retorno do metodo
    }catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
};

const mockit = () => {
        mockupBackend(URL_COMPANY);
};
</script>

<template>
<h1 class="display text-center">Configurações</h1>
<section class="container-fluid">
        <section class="row">
                <article  class="col-12 border-1 rounded m-1 p-1 flex justify-evenly items-center">
                        Projeto desenvolvido como parte da disciplina PISH em 2024.
                        Grupo: Cristian<br>
                        Dayane<br>
                        Gabriel B<br>
                        Guilherme<br>
                </article>
        </section>
        <article class="row">
                <form @submit:prevent="mockit" action="#" method="POST">
                        <label for="inputCompanyName">Nome da Empresa: </label>
                        <input type="text" name="inputCompanyName" id="inputCompanyName" v-model="mock.name"/>
                        <label for="inputCompanyEmail">E-mail: </label>
                        <input type="email" name="inputCompanyEmail" id="inputCompanyEmail" v-model="mock.email"/>
                        <label for="inputCompanyContract">Contrato: </label>
                        <input type="text" name="inputCompanyContract" id="inputCompanyContract" v-model="mock.contract" />
                        <input type="submit" value="Enviar Mock" />
                </form>
        </article>
</section>
</template>

<style scoped>
.platinum{
        color:rgb(110, 105, 89);
        font-weight: bolder;
}
</style>