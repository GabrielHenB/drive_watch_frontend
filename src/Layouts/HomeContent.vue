<script setup>
import {ref, onMounted} from 'vue';
import {fetchData, URL_REGISTER} from '@/api.js';

import Message from '@/Components/Message.vue';
import LoadingItem from '@/Components/LoadingItem.vue';

const dados = ref([]); //REATIVO
const resposta = ref("");
const mostrarErro = ref(false);
const loading = ref(false);

// Executa apos mounted
onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetchData(URL_REGISTER);
    console.log(response);
    dados.value = response;
  } catch (error) {
    console.error('Error fetching data:', error);
    resposta.value = "Erro: " + error.message;
    mostrarErro.value = true;
  };
});

function closeMsg(){
  mostrarErro.value = false;
}

function formatar_data(datestring){
    const newDate = new Date(datestring);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Sao_Paulo'
      };
      return newDate.toLocaleString('pt-BR', options);
}

</script>
<template>
    <div v-if="mostrarErro" class="warning">
      <Message titulo="Erro!" @close="closeMsg">
        Ocorreu um erro na requisição. <br> 
        <span class="text-danger">{{resposta}}</span>
      </Message>
    </div>
    <div class="row justify-content-between" v-if="dados.length > 0">
            <div class="col-12 col-md-6 col-lg text-center my-1" v-for="(item,index) of dados">
                <template v-if="index < 3">
                    <img :src="item.image" alt="" style="width: 400px">
                    <p class="my-0 py-0" style="font-size: medium;"><span>Classe</span> {{ item.class }}</p>
                    <p class="my-0 py-0" style="font-size: small;"><span class="negrito">Data:</span> {{ formatar_data(item.occurenceDate) }}</p>
                </template>
            </div>
            <div class="col-12 col-md-6 col-lg text-center my-1 d-flex flex-column justify-content-center align-items-center">
                <RouterLink :to="{name: 'events'}" class="p-0 fs-4 text-decoration-none">Ver<br>Mais</RouterLink>
            </div>
        </div>
        <div class="row" v-else>
            <div v-if="loading" class="text-center fs-5">
                <LoadingItem></LoadingItem>
                <p>Carregando...</p>
            </div>
            <p v-else class="text-center fs-5">Sem dados para exibir...</p>
        </div>
</template>