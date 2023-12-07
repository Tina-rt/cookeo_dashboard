<script>
import MyNavigationDrawer from './MyNavigationDrawer.vue';
import axios from 'axios'

function get_total(list_produit) {

}

export default {
    components: {
        MyNavigationDrawer
    },
    mounted() {
        axios.get('http://localhost:3001/api/commande').then((data) => {
            this.liste_commande = data.data
        })
    },
    methods: {
        open_commande(commande) {
            this.current_commande = commande;
            this.dialog_detail = true;
            this.current_list_produit = this.current_commande.commande_produits.map((pd_elment) => {
                return {
                    label: pd_elment.produit.label,
                    prix_unitaire: pd_elment.produit.prix,
                    quantite: pd_elment.quantite,
                    prix: pd_elment.produit.prix * pd_elment.quantite,
                }
            });
            console.log(this.current_list_produit)
        }
    },
    data() {
        return {
            dialog_detail: false,
            search: '',
            current_commande: {},
            current_list_produit: [],
            liste_commande: [],
            headers_popup: [
                {
                    title: 'Label',
                    value: 'label'
                },
                {
                    title: 'Prix Unitaire',
                    value: 'prix_unitaire'
                },
                {
                    title: 'Quantite',
                    value: 'quantite'
                },
                {
                    title: 'Prix',
                    value: 'prix'
                }
            ],
            headers: [
                {
                    align: 'start',
                    key: 'id',
                    sortable: false,
                    title: 'Commande index',
                },
                { key: 'client.nom', title: 'Client' },
                { key: 'date_commande', title: 'Date du commande' },

            ],
        }
    }
}
</script>

<template>
    <MyNavigationDrawer />
    <v-dialog v-model="dialog_detail" width="auto">
        <v-card>
            <v-card-text>
                Detail commande ticket numero {{ current_commande.id }}
                <v-data-table :headers="headers_popup" :items="current_list_produit" item-key="name"
                    items-per-page="5"></v-data-table>
                <div class="d-flex ma-2">
                    <div class="text-green" >
                        <v-icon size="large" icon="mdi-moped-electric"></v-icon>
                        Livré
                    </div>
                </div>
                <div class="d-flex ga-2 ma-2 justify-end">
                    <span class="font-weight-bold">Total</span>
                    <span class="font-weight-black">{{ current_list_produit.reduce((total, currentItem) => {
                        return total +
                            currentItem.prix
                    }, 0).toLocaleString('fr', {
                        style: 'currency',
                        currency: 'MGA',
                    }) }}</span>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog_detail = false">Fermer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <div class="pa-2 bg-grey-lighten-3 fill-height">
        <div class="pa-2 bg-white">
            <div class="">
                <v-card flat title="Liste des commandes" class="list-commande">

                    <v-card class="w-100" hover v-for="commande in liste_commande" @click="open_commande(commande)">
                        <v-card-item>
                            <v-card-title>
                                Ticket numero : {{ commande.id }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ commande.date_commande }}
                            </v-card-subtitle>
                        </v-card-item>

                        <v-card-text>
                            Client: {{ commande.client.nom }}
                        </v-card-text>
                    </v-card>
                </v-card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list-commande {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>