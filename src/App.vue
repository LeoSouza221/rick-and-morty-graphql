<template>
  <v-app>
    <v-app-bar
      app
      color="accent"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/../public/rick_logo.png')"
          transition="scale-transition"
          width="120"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <v-icon>mdi-filmstrip</v-icon>
        <span class="mr-2">Episodios</span>
      </v-btn>
      <v-btn
        text
      >
        <v-icon>mdi-account-group</v-icon>
        <span class="mr-2">Personagens</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
