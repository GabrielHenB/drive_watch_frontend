<script setup>
import {URL_REGISTER, fetchData} from '@/api.js';
import {onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Message from '@/Components/Message.vue';
import LoadingItem from '@/Components/LoadingItem.vue';

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
    const response = await fetchData(URL_REGISTER);
    //console.log(response);
    dados.value = response;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    resposta.value = "Erro: " + error.message;
    mostrarErro.value = true;
  };
});

function redirecionar(query){
  router.push({
    name: 'pessoas_update',
    params: {id: query}
  });
}

function closeMsg(){
  mostrarErro.value = false;
}

</script>

<template>
  <main>
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
        <article v-for="(item, index) of dados" class="col-12 col-md-6">
          <div class="d-flex justify-content-center align-items-center gap-1 my-3">
            <div class="foto">
              <img src="drivewatch.png" width="260" style="max-width: 100%;" />
            </div>
            <div class="m-0 p-1 d-flex flex-column align-items-center">
              <h2 class="text-center"><strong>Dispositivo:</strong> <span>{{ item.id_device }}</span></h2>
              <p class="text-start"><strong>Empresa:</strong> <span>{{ item.id_company }}</span></p>
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