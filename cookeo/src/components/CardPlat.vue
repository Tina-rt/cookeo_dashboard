<script>
import axios from 'axios';
import { useAppStore } from '@/store/app';

export default {
    props: {
        id:{
            Number
        },
        label: {
            String
        },
        prix: {
            Number
        },
        categorie: {
            Object
        },
        images: {
            Array,

        },
        disponible: {
            Boolean
        },
        description:{
            String
        }
    },
    data() {
        let app_store = useAppStore();
        return {
            api_url: 'http://localhost:3001/images/',
            default_img: '/img/cookeologo.png',
            disponible_: false,
            prix_: 0,
            app_store: app_store
        }
    },
    mounted() {
        this.disponible_ = this.disponible;
        this.prix_ = (this.prix).toLocaleString('fr', {
            style: 'currency',
            currency: 'MGA',
        });
    },
    methods: {
        delete_plat() {
            axios.post('http://localhost:3001/api/produit/delete', {id: this.id}).then((data) => {
                console.log(data)
                this.app_store.get_plat();
            })
        }
    }
}
</script>
<template>
    <v-card class="mx-auto" width="344">
        <v-img :src=images[0]?api_url+images[0].path:default_img height="150px" cover></v-img>

        <v-card-title>
            {{ label }}
        </v-card-title>

        <v-card-subtitle>
            <span v-if="disponible_" class="text-green">Disponible <v-icon icon="mdi-check"></v-icon></span>
            <span v-else class="text-red">Indisponible <v-icon icon="mdi-close"></v-icon></span>
            <div>
                {{ categorie.label }}
            </div>
            <div class="text-wrap pt-2">
                {{ description }}
            </div>
        </v-card-subtitle>
        <div class="pt-1 px-4">
            {{ prix_}} 
        </div>


        <div class="pa-2">
            <v-switch label="Disponiblité" v-model="disponible_" color="primary"></v-switch>

        </div>
        <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text">
                Explore
            </v-btn>
            <v-btn color="warning" @click="delete_plat"><v-icon icon="mdi-delete" size="large"></v-icon></v-btn>


        </v-card-actions>


    </v-card>
</template>