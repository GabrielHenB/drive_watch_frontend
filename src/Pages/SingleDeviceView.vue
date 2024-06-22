<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as CONSTS from '@/config.js';
import {Fetcher} from '@/api.js';
import Message from '@/Components/Message.vue';

const route = useRoute();
const hasMsg = ref(false);
const msg = ref('');
const loading = ref(false);
//const id_device = ref(route.params.id);
const device_data = reactive({
    id_device: route.params.id,
    plate: '',
    version: '',
    company: '',
    phone: ''
});

const runEveryMount = async () => {
    const fetcher = new Fetcher();
    let is_valid = true;
    hasMsg.value = false;
    msg.value = '';
    loading.value = true;

    if(!device_data.id_device){
        is_valid = false;
        msg.value = "Erro: ID invalido!";
        hasMsg.value = true;
    }

    try{
        // Fetches the device in question
        const device_response = await fetcher.useFetch(CONSTS.URL_DEVICE + `/${device_data.id_device}`);
        // Fetches the company by device
        const company_response = await fetcher.useFetch(CONSTS.URL_COMPANY + "/" + device_response.idCompany);
        // Fetches the phone by device
        const phone_response = await fetcher.useFetch(CONSTS.URL_PHONE_BY_DEVICE + device_data.id_device);
        // Debug
        console.log(device_response, company_response, phone_response);
        // Se OK
        device_data.plate = device_response.plate;
        device_data.version = device_response.version;
        device_data.company = company_response.name;
        device_data.phone = `(${phone_response.areaCode}) ${phone_response.phoneNumber}`;
    }catch(error){
        console.error(error);
        msg.value = error.message;
        hasMsg.value = true;
    }finally{
        loading.value = false;
    }
};

onMounted(async () => await runEveryMount());

const close = () => {hasMsg.value = false; msg.value = '';}

</script>

<template>
<main>
    <Message v-if="hasMsg"  @close="close">
        <p>{{ msg }}</p>
    </Message>
    <p v-if="loading">Carregando...</p>
    <div v-if="device_data.company" class="m-0 p-1 d-flex flex-column align-items-center">
              <h2 class="text-center"><strong>Dispositivo:</strong> <span>{{ device_data.id_device }}</span></h2>
              <p class="text-start"><strong>Empresa:</strong> <span>A</span></p>
              <p class="text-start"><strong>Placa:</strong> <span>ABC</span></p>
              <p class="text-end">Version: 22</p>
    </div>
    <div v-else>
        <p class="mx-auto my-2 text-center p-1 fs-2">Houveram erros na obtenção de informações do dispositivo.<br> Tente novamente!</p>
    </div>
</main>
</template>

<style scoped>
</style>