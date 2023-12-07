<template>
  <div class="fill-height w-100 ma-0 pa-0">
    <v-responsive class="fill-height">
      <MyNavigationDrawer />

      <div class="bg-grey-lighten-3 fill-height w-100 pa-5">
        <div class="d-flex ga-5 w-100 fill-width justify-space-between flex-wrap">
          <CardOverview label="Clients" value="230" />
          <CardOverview label="Revenu" value="130000" />
          <CardOverview label="Profit" value="60%" />
          <CardOverview label="Commande en cours" value="12" />
        </div>
        <v-row class="pa-5">
          <v-col class="">
            <v-card >
              <v-card-title primary-title>
                Sales overview
              </v-card-title>
              <v-card-text>
                <Barchart />
              </v-card-text>
            </v-card>

          </v-col>
          <v-col class="">
            <v-card>
              <v-card-title primary-title>
                Produits les plus vendues
              </v-card-title>
              <v-card-text>
                <Piechart/>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </div>


    </v-responsive>
  </div>
</template>

<script>
import CardOverview from './CardOverview.vue';
import MyNavigationDrawer from './MyNavigationDrawer.vue';
import Barchart from './Barchart.vue';
import Piechart from './Piechart.vue';

export default {
  components: {
    CardOverview,
    MyNavigationDrawer,
    Barchart,
    Piechart
  }
}

</script>
