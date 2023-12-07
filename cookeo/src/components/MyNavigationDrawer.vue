<template>
    <v-navigation-drawer :width="235" expand-on-hover rail class="bg-black">
        <!-- <v-list-item title="Cookeo Dashboard" subtitle="Vuetify"></v-list-item> -->
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"></v-list-item>
        </v-list>


        <v-divider></v-divider>
        <v-list-item variant="plain" link title="Dashboard" prepend-icon="mdi-home" @click="this.$router.push('/admin/dashboard')"></v-list-item>
        <v-list-item variant="plain" link title="Commande" prepend-icon="mdi-cart" @click="this.$router.push('/admin/commande')"></v-list-item>
        <v-list-item variant="plain" link title="Plat" prepend-icon="mdi-silverware" @click="this.$router.push('/admin/plats')"></v-list-item>
        <v-list-item variant="plain" link title="Client" prepend-icon="mdi-account-multiple" @click="this.$router.push('/admin/client')"></v-list-item>
        <v-list-item variant="plain" link title="Categorie" prepend-icon="mdi-format-list-bulleted-square" @click="this.$router.push('/admin/categorie')"></v-list-item>
    </v-navigation-drawer>
</template>