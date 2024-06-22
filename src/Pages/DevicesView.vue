<script setup>
import {fetchData} from '@/api.js';
import { URL_REGISTER, URL_DEVICE } from '@/config.js';
import {onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Message from '@/Components/Message.vue';
import LoadingItem from '@/Components/LoadingItem.vue';
import SearchComponent from '@/Components/SearchComponent.vue';

// Create an Axios instance with custom options
const instance = axios.create({
  httpsAgent: false,
});

const dados = ref([]); //REATIVO
const resposta = ref("");
const mostrarErro = ref(false);
const router = useRouter();
const loading = ref(false);

// Executa apos mounted
onMounted(async () => {
  loading.value = true;
  try {
    const response = await fetchData(URL_DEVICE);
    //console.log(response);
    dados.value = response;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    resposta.value = "Erro: " + error.message;
    mostrarErro.value = true;
  };
});

/**
 * Redireciona para uma route de um device unico a partir do ID
 * @param {String} query 
 */
function redirecionar(query){
  router.push({
    name: 'device_show',
    params: {id: query}
  });
}

function closeMsg(){
  mostrarErro.value = false;
}

</script>

<template>
  <main>
    <SearchComponent :endpoint="URL_DEVICE" @result="(device) => redirecionar(device[0].id)" />
    <div v-if="mostrarErro" class="warning">
      <Message titulo="Erro!" @close="closeMsg">
        Ocorreu um erro na requisição. <br>
        <span class="text-danger">{{resposta}}</span>
      </Message>
    </div>
    <div v-if="dados.length === 0 && !loading" class="fs-4 text-center py-4">Nenhum dispositivo foi encontrado</div>
    <div v-if="loading" class="text-center m-2 p-2"><LoadingItem></LoadingItem> Carregando...</div>
    <section class="container mt-4">
      <div class="row">
        <article v-for="(item, index) of dados" :id="'dispositivo_'+index" class="col-12 col-md-6">
          <div class="d-flex justify-content-center align-items-center gap-1 my-3">
            <div class="foto">
              <img src="drivewatch.png" width="260" style="max-width: 100%;" />
            </div>
            <div class="m-0 p-1 d-flex flex-column align-items-center">
              <h2 class="text-center"><strong>Dispositivo:</strong> <span>{{ item.id }}</span></h2>
              <p class="text-start"><strong>Empresa:</strong> <span>{{ item.idCompany }}</span></p>
              <p class="text-start"><strong>Placa:</strong> <span>{{ item.plate }}</span></p>
              <p class="text-end">Version: {{ item.version }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.foto img{
  max-width: 100%;
  width: 380px;
  height: 100%;
}
</style>