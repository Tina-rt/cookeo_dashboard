<script>
import MenuComp from './MenuComp.vue';
import { useAppStore } from '@/store/app';
import axios from 'axios';

export default {
    components: {
        MenuComp
    },
    props: {
        dialog: {
            Boolean
        }
    },
    methods: {
        get_total() {
            this.total = 0;
            this.useAppStore.list_cart = [];
            this.selected_menu.forEach(element => {
                console.log(element)
                this.useAppStore.list_cart.push(this.useAppStore.list_plat[element]);

                this.total += this.useAppStore.list_plat[element].prix;
            });
            return 1
        },
        process_order() {
            this.process = true;
            setTimeout(() => {
                this.process = false;
                this.$emit('process');
            }, 2000);
        }
    },
    data() {
        let useapp = useAppStore();
        return {
            useAppStore: useapp,
            menu_simple: true,
            selected_menu: [
                {
                    produitid: null,
                    quantite: null
                }
            ],
            api_url: 'http://localhost:3001/images/',
            default_img: '/img/cookeologo.png',
            current_client: {
                nom: null,
                email: null,
                tel: null,
            },
            current_commande: {
                clientid: null,
                date_livraison: null,
                lieu_livraison: null
            },
            local_cart: [],
            total: 0,
            process: false,

        }
    },
    watch: {
        selected_menu(old_, new_) {
            // console.log(this.useAppStore.list_plat[0]);
            // this.total = new_.reduce((acc, item)=>{return acc+this.useAppStore.list_plat[item].prix})
            // this.useAppStore.add_cart()
            this.get_total()
        }
    }
}
</script>
<template>
    <div class="main-modal" :class="{ show: dialog }">
        <v-dialog z-index="1010" v-model="process" width="auto" >
            <v-card class="bg-dark text-white">
                <div class="d-flex justify-content-center pa-5">
                    <img src="/img/orange.png" alt="orange" width="100">
                </div>
                <v-card-title primary-title>
                    Paiment mobile en cours
                </v-card-title>
                <v-card-text>
                    <v-progress-linear indeterminate></v-progress-linear>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="process = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="modal-order">
            <div class="close" @click="this.$emit('close')"><v-icon icon="mdi-close"></v-icon></div>
            <div class="modal-order-win-title">
                <div class="text">RESERVATION</div>
                <div class="trait"></div>
            </div>
            <div class="modal-order-title">
                Order Your Menu
            </div>
            <div class="order-form">
                <div class="inline">
                    <v-text-field v-model="useAppStore.user.nom" label="Nom" variant="outlined"></v-text-field>
                    <v-text-field v-model="useAppStore.user.email" type="email" label="email"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="useAppStore.user.tel" type="tel" label="Telephone"
                        variant="outlined"></v-text-field>
                </div>
                <div class="inline">
                    <v-text-field type="date" label="date" variant="outlined"></v-text-field>
                    <v-text-field label="Heure" variant="outlined" type="time"></v-text-field>
                    <v-text-field label="Adresse" variant="outlined"></v-text-field>
                </div>
            </div>
            <div class="my-5 btn-group">
                <div class="btn-choice" :class="{ active: !menu_simple }" @click="menu_simple = false" color="">Customisé
                </div>
                <div class="btn-choice" :class="{ active: menu_simple }" @click="menu_simple = true" color="">Simple</div>
            </div>
            <div class="list-menu">
                <v-slide-group v-model="selected_menu" class="pa-4" selected-class="bg-grey-darken-3" multiple show-arrows>
                    <v-slide-group-item v-for="(plat, index) in useAppStore.list_plat" :key="index"
                        v-slot="{ isSelected, toggle, selectedClass }">
                        <v-card variant="tonal" :class="['ma-4', selectedClass]" height="240" width="150" @click="toggle">
                            <v-img :src="api_url + plat.images[0].path" aspect-ratio="1"></v-img>
                            <v-card-title>{{ plat.label }}</v-card-title>
                            <v-card-subtitle>{{ plat.prix }} ar</v-card-subtitle>

                            <v-card-text>
                                input
                            </v-card-text>

                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </div>
            <div class="order-footer">
                <div class="d-flex align-items-center ga-3">
                    <div class="label-pri">Total</div>
                    <div class="prix-section">
                        <div class="prix">{{ total }}</div>
                        <div>Ar</div>
                    </div>
                </div>

                <div class="btn-envoie" @click="process_order"><v-icon icon="mdi-check"></v-icon> Process</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.show {
    display: none;
}

.order-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.prix-section {
    padding: 20px;
    border: 1px solid grey;
    width: 200px;
    display: flex;
    justify-content: space-between;
}

.btn-envoie {
    padding: 20px;
    width: 200px;
    background-color: var(--color-1);
    color: black;
    text-align: center;
    transition: all 0.2s;
    font-weight: bold;
}

.btn-envoie:hover {
    cursor: pointer;
    background-color: #ccae02;
}

.list-menu {
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
}

.btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.btn-choice {
    background-color: transparent;
    padding: 20px;
    border: 1px solid grey;
    color: white;
    cursor: pointer;
    width: 150px;
    text-align: center;
    transition: all 0.2s;
}

.btn-choice.active {
    background-color: var(--color-1);
    color: black;
}

.btn-choice:hover {
    background-color: var(--color-1);
    color: black;
}

.main-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 100%;

    .modal-order {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
        padding: 50px;
        width: 70%;

        font-family: var(--font-1);

        @media (max-width:400px) {
            left: 0;
            top: 50px;
            width: 100%;
            transform: translatex(0);
        }

        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                color: rgb(221, 221, 221);
            }
        }

        .modal-order-win-title {
            display: flex;
            flex-direction: row;

            padding: 20px 0;
            letter-spacing: 7px;
            font-size: 1.4em;
            // font-family: var(--font-);

            .trait {
                border-top: 1px solid white;
                width: 200px;
                transform: translateY(50%);
                margin-left: 20px;
            }
        }

        .modal-order-title {
            font-family: var(--font-2);
            font-size: 2em;
            font-weight: bold;
            letter-spacing: 5px;
            color: var(--color-1);
        }

        .order-form {
            margin: 10px 0;

            .inline {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 10px;
                padding: 10px 0;
                width: 100%;
                justify-content: space-between;

                * {
                    width: 200px;
                }
            }
        }
    }

}
</style>