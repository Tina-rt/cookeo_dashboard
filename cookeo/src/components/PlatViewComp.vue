<script>
import CardPlat from './CardPlat.vue';
import MyNavigationDrawer from './MyNavigationDrawer.vue';
import axios from 'axios';
import { useAppStore } from '@/store/app';

export default {
    components: {
        CardPlat,
        MyNavigationDrawer
    },
    data() {
        let app_store_temp = useAppStore();
        app_store_temp.get_plat()
        return {
            app_store: app_store_temp,
            list_plat: app_store_temp.list_plat,
            list_categorie: [],
            current_plat: {
                label: '',
                categorieid: null,
                prix: 0,
                disponible: true,
                description: ""

            },
            current_plat_image: [],
            rules: [
                value => {
                    return !value || !value.length || value[0].size < 2000000 || "la taille d'un images ne doit pas depasser 2mb"
                },
            ],
            dialog: false
        }
    },
    methods: {
        add_plat() {
            console.log(this.current_plat);
            axios.post('http://localhost:3001/api/produit', this.current_plat).then((data) => {
                console.log(data.data)   
                this.current_plat_image.forEach(file => {
                    let formData = new FormData();
                    formData.append('files', file);
                    formData.append('produitid', data.data.id)
                    axios.post('http://localhost:3001/api/images', formData).then((response) => {
                        console.log(response);
                        this.app_store.get_plat();
                    })
                });
            });
            this.current_plat = {
                label: '',
                categorieid: null,
                prix: 0,
                disponible: true,
                description: ""

            }
            this.dialog = false;

        }
    },
    mounted() {
        // axios.get('http://localhost:3001/api/produit').then((data) => {
        //     this.list_plat = data.data;
        //     console.log(this.list_plat[0].images)
        // })
        axios.get('http://localhost:3001/api/categorie').then((data) => {
            this.list_categorie = data.data;
        })

    }
}   
</script>

<template>
    <MyNavigationDrawer />

    <div class="fill-height pa-2 bg-grey-lighten-3">
        <div class="ma-4 pa-3 bg-white">
            <div class="d-flex justify-space-between">
                <h2>Liste des plats</h2>
                <div class="actions">
                    <v-btn prepend-icon="mdi-plus" color="blue" @click="dialog = true">Nouveau plat</v-btn>
                </div>
            </div>
            <v-dialog v-model="dialog" width="600">
                <v-card class="pa-5">
                    <h2>Ajouter un nouveau plat</h2>
                    <v-card-text>
                        <v-form>
                            <v-text-field name="label" label="Nom du plat" id="label" v-model="current_plat.label"></v-text-field>
                            <v-text-field name="prix" label="Prix" id="prix" v-model="current_plat.prix" type="number"></v-text-field>
                            <v-select :items="list_categorie" item-title="label" v-model="current_plat.categorieid"
                                item-value="id" item-text="label" label="Categorie"></v-select>
                            <v-switch label="Disponible" color="primary" v-model="current_plat.disponible"></v-switch>
                            <v-text-field
                                label="Description"
                                name="description"
                                v-model="current_plat.description"
                                textarea
                            ></v-text-field>
                            <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp"
                                placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" multiple
                                v-model="current_plat_image"></v-file-input>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="add_plat">Ajouter</v-btn>
                        <v-btn color="" @click="dialog = false">Annuler</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div class="liste-plat ma-5">
                <CardPlat v-for="plat in app_store.list_plat" :label="plat.label" :prix="plat.prix" :categorie="plat.categorie"
                    :images="plat.images" :disponible="plat.disponible" :id="plat.id" :description="plat.description"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.liste-plat{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: start;
}
</style>