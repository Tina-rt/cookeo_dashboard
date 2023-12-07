<script>
import MyNavigationDrawer from './MyNavigationDrawer.vue';
import axios from 'axios';
import { useAppStore } from '@/store/app';

export default {
    components: {
        MyNavigationDrawer
    },
    mounted() {
        axios.get('http://localhost:3001/api/categorie').then((data) => {
            this.list_categorie = data.data;

        })
    },
    data() {
        let useAppStore_ = useAppStore();
        return {
            list_categorie: [],
            useAppStore: useAppStore_,
            dialog: false,
            current_categorie: {
                label: ""
            }
        }
    },
    methods: {
        add_categorie() {
            axios.post('http://localhost:3001/api/categorie', this.current_categorie).then((data) => {
                console.log(data)
                this.dialog = false;
                this.useAppStore.get_categorie();
            })
        },
        delete_categorie(id){
            axios.post('http://localhost:3001/api/categorie/delete', {id:id}).then((data)=>{
                console.log(data);
                this.useAppStore.get_categorie();

            })
        }
    }
}
</script>

<template>
    <MyNavigationDrawer />
    <div class="bg-grey-lighten-1 fill-height pa-3">
        <v-dialog v-model="dialog" width="600">
            <v-card class="pa-5">
                <h2>Ajouter un nouveau categorie</h2>
                <v-card-text>
                    <v-form>
                        <v-text-field name="label" label="Nom du categorie" id="label"
                            v-model="current_categorie.label"></v-text-field>

                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="add_categorie">Ajouter</v-btn>
                    <v-btn color="" @click="dialog = false">Annuler</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card flat class="bg-white pa-5">
            <div class="d-flex justify-space-between">
                <h2>Liste des Categories</h2>
                <div class="actions">
                    <v-btn prepend-icon="mdi-plus" color="blue" @click="dialog = true">Nouvel Catégorie</v-btn>
                </div>
            </div>
            <v-card-text>
                <div class="list-categorie">
                    <v-card min-width="300px" max-width="300px" height="100px"
                        v-for="(categorie, index) in useAppStore.list_categorie" :key="index">
                        <v-card-title primary-title>
                            {{ categorie.label }}
                        </v-card-title>
                        <v-card-actions>
                            <v-btn prepend-icon="mdi-delete" color="warning" @click="delete_categorie(categorie.id)">Supprimer</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<style scoped>
.list-categorie{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}
</style>