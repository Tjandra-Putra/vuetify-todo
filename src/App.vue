<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-img
        class="pa-4"
        lazy-src="https://picsum.photos/id/11/10/6"
        height="170"
        src="mountain.png"
        gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.5)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Tjandra Putra" />
        </v-avatar>

        <div class="white--text text-subtitle-1 font-weight-bold">Tjandra Putra</div>
        <div class="white--text text-subtitle-2">tjandra_putra</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="mountain.png" prominent height="170" class="pt-4">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search></search>
        </v-row>
        <v-row>
          <v-app-bar-title class="ml-4 text-h5"
            ><div>{{ $store.state.appTitle }}</div>
          </v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time></live-date-time>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- ===== Pages will render here ===== -->
    <v-main>
      <router-view></router-view>
      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
  components: {
    search: require("@/components/Tools/Search.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
    snackbar: require("@/components/Shared/SnackBar.vue").default,
  },
};
</script>

<style lang="css">
.header-container {
  max-width: none !important;
}
</style>
