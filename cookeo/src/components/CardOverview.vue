<script>
export default {
    props: {
        label: {
            String
        },
        value: {
            Number,
        }
    }
}
</script>

<template>
    <div class="main-card-overview bg-white pa-2 d-flex justify-space-between">
        <div class="contain">
            <div class="label">{{ label }}</div>
            <div class="value">{{ value }}</div>
        </div>
        <div class="icon-card ">
            <v-icon icon="mdi-account-group"></v-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main-card-overview {
    max-width: 300px;
    min-width: 300px;
    padding: 10px;

    .value {
        font-size: 2em;
    }
    .contain{
        border-left: 5px solid #03A9F4;
        padding-left: 20px;
    }

    .icon-card{
        font-size: 2em;
    }
}
</style>