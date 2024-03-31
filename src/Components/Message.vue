<script setup>
defineProps({
    tipo: {
        type: String,
        default(){
            return 'normal';
        }
    },
    titulo: {
        type: String,
        default(){
            return "Aviso";
        }
    }
});

const emit = defineEmits(['close']);

function close(){
    emit('close',true);
}

</script>

<template>
    <div class="container-mensagem">
        <div class="content-mensagem d-flex flex-column justify-content-center align-items-center">
            <i class="bi bi-exclamation-triangle-fill msgicon" style="color: yellow;"></i>
            <h2>{{ titulo }}</h2>
            <p>
                <slot></slot>
            </p>
            <button class="btn btn-danger" @click="close">Fechar</button>
        </div>
    </div>
</template>

<style scoped>
.container-mensagem{
    position: absolute;
    z-index: 99;
    left: 25%;
    top: 25%;
    background-color: var(--cor-universo-escuro);
    border: solid 1px rgba(20,20,20,0.8);
    border-radius: 20px;
}
.content-mensagem{
    color: var(--cor-branca);
    font-size: 20px;
    padding: 10px;
}
.msgicon{
    font-size: 60px;
}
</style>