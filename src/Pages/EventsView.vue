<script setup>
import {fetchData} from '@/api.js';
import {URL_EVENTOS, URL_REGISTER} from '@/config.js';
import {onMounted, ref } from 'vue';
import Message from '@/Components/Message.vue';
import LoadingItem from '@/Components/LoadingItem.vue';

const dados = ref([]); //REATIVO
const resposta = ref("");
const mostrarErro = ref(false);
const loading = ref(false);

// Quando o componente for montado execute isso:
onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetchData(URL_REGISTER);
    //console.log(res);
    dados.value = res;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    resposta.value = "Erro: " + error.message;
    mostrarErro.value = true;
  }
});

function renderError(msg){
  //resposta.value=msg;
  mostrarErro.value=true;
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
<main>
    <Message v-if="mostrarErro" @close="renderError" class="warning">
      Ocorreu um erro na requisição. <br> <span class="text-danger">{{ resposta}}</span>
    </Message>
    
    <div v-if="dados.length === 0" class="text-center my-2 py-2">
      <div v-if="loading">
        <LoadingItem></LoadingItem>
        Carregando...
      </div>
      <div v-else>
        Nenhum evento foi registrado
      </div>
    </div>

    <section class="contain container-fluid">
      <div class="row">
        <article v-for="(item,index) of dados"  class="d-flex justify-content-center gap-2 my-2 col-12 col-md-6 col-lg-4 mx-auto px-2">
            <div class="modified-flex">
                <div class="foto">
                  <img :src="item.image">
                </div>
                <div class="fs-4">
                  <h2 class="fs-5 display-1"><label :for="'in_'+index"><span class="negrito">Classe: &#8194;</span></label>{{ item.class }}</h2>
                  <p class="my-0 p-0"><span>ID Device: </span> {{ item.id_device }}</p>
                  <p class="my-0 p-0"><span>ID Company: </span> {{ item.id_company }}</p>
                  <p class="fs-6"><span>Horário:</span> <span class="datetime">{{  formatar_data(item.occurenceDate) }}</span></p>
                  <!--<button onclick="window.alert('Indisponivel!')" class="btn btn-primary">Editar</button>-->
                </div>
            </div>
            
        </article>
      </div>
    </section>
    <div class="fantasma">

    </div>
</main>
</template>

<style scoped>
.foto img{
  max-width: 100%;
  width: 380px;
  height: 100%;
}
.fantasma{
  height: 90px;
}
.modified-flex{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
}
@media (max-width: 768px) { 
    .modified-flex{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
}
</style>