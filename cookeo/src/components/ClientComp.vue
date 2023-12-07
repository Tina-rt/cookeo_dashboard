<script>
import MyNavigationDrawer from './MyNavigationDrawer.vue';
import axios from 'axios';
import { useAppStore } from '@/store/app';

export default {
    components: {
        MyNavigationDrawer
    },
    mounted() {
        axios.get('http://localhost:3001/api/client').then((data) => {
            this.list_client = data.data;
            console.log(this.list_client)

        })
    },
    data() {
        let useAppStore_ = useAppStore();
        return {
            list_client: [],
            useAppStore: useAppStore_,
            dialog: false,
            current_client: {
                label: ""
            },
            search: "",
            headers: [
                
                { key: 'id', title: 'ID' },
                { key: 'nom', title: 'Nom' },
                { key: 'prenom', title: 'Prenom' },
                { key: 'email', title: 'email' },
                { key: 'tel', title: 'Telephone' },
            ]
        }
    },
    methods: {

    }
}
</script>

<template>
    <MyNavigationDrawer />
    <div class="bg-grey-lighten-1 fill-height pa-3">
        <v-dialog v-model="dialog" width="600">
            <v-card class="pa-5">
                <h2>Ajouter un nouveau client</h2>
                <v-card-text>
                    <v-form>
                        <v-text-field name="label" label="Nom du client" id="label"
                            v-model="current_client.label"></v-text-field>

                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="add_client">Ajouter</v-btn>
                    <v-btn color="" @click="dialog = false">Annuler</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card flat class="bg-white pa-5">
            <div class="d-flex justify-space-between">
                <h2>Liste des clients</h2>
                
            </div>
            <v-card-text>
                <div class="list-categorie">

                    
                    <v-data-table :headers="headers" :items="list_client" :search="search"></v-data-table>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<style scoped>
.list-client {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}
</style>