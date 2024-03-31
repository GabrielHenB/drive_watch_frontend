<template>
    <img class="rodar" src="/drivewatch.png" width="100" />
</template>

<style scoped>
.rodar{
    width: 100px;
    height: 100px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    animation: roda 2s infinite linear;
    
}

@keyframes roda{
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>