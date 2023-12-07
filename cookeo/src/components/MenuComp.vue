<script>
export default {
    props: {
        produit: {
            Object
        }
    }
}
</script>

<template>
    <v-card color="dark" outline theme="dark">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h5">
                    Supermodel
                </v-card-title>

                <v-card-subtitle>Foster the People</v-card-subtitle>

                <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" size="small">
                        START RADIO
                    </v-btn>
                </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" rounded="0">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
            </v-avatar>
        </div>
    </v-card>
</template>